// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "solecs/System.sol";
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";
import { PositionComponent, ID as PositionComponentID, Coord } from "../components/PositionComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "../components/OwnedByComponent.sol";
import { EnergyComponent, ID as EnergyComponentID } from "../components/EnergyComponent.sol";
import { HasChildComponent, ID as HasChildComponentID } from "../components/HasChildComponent.sol";
import { LastUpdatedTimeComponent, ID as LastUpdatedTimeComponentID } from "../components/LastUpdatedTimeComponent.sol";

uint256 constant ID = uint256(keccak256("system.SpawnEntity"));

uint256 constant coord00 = uint256(keccak256("00"));
uint256 constant coord10 = uint256(keccak256("10"));
uint256 constant coord20 = uint256(keccak256("20"));
uint256 constant coord01 = uint256(keccak256("01"));
uint256 constant coord11 = uint256(keccak256("11"));
uint256 constant coord21 = uint256(keccak256("21"));
uint256 constant coord02 = uint256(keccak256("01"));
uint256 constant coord12 = uint256(keccak256("12"));
uint256 constant coord22 = uint256(keccak256("22"));

uint32 constant initialEnergy = 5;
uint32 constant energyCap = 30;
uint32 constant childCreationCost = 30;
uint32 constant initialChildren = 0;

function getCurrentChildCount(HasChildComponent hasChildComponent, uint256 entity) view returns (uint32) {
  bytes memory currentChildCountBytes = hasChildComponent.getRawValue(entity);
  return currentChildCountBytes.length == 0 ? 0 : abi.decode(currentChildCountBytes, (uint32));
}

function getLastUpdatedTimeOfEntity(LastUpdatedTimeComponent lastUpdatedTimeComponent, uint256 lastUpdatedTimeEntity)
  view
  returns (uint32)
{
  bytes memory currentEntityLastUpdatedTimeBytes = lastUpdatedTimeComponent.getRawValue(lastUpdatedTimeEntity);
  return currentEntityLastUpdatedTimeBytes.length == 0 ? 0 : abi.decode(currentEntityLastUpdatedTimeBytes, (uint32));
}

function calculateEnergy(
  uint32 currentTime,
  uint32 lastUpdatedTime,
  uint32 currentEnergy,
  uint32 nrgCap
) pure returns (uint32) {
  uint32 _timeDiffInSeconds = currentTime - lastUpdatedTime;
  uint32 _energyIncrementValue = _timeDiffInSeconds; // +1 energy per second
  uint32 _newEnergy = currentEnergy + _energyIncrementValue;
  _newEnergy = nrgCap < _newEnergy ? nrgCap : _newEnergy;
  return _newEnergy;
}

function getEnergyOfEntity(EnergyComponent energyComponent, uint256 energyEntity) view returns (uint32) {
  bytes memory currentEnergyBytes = energyComponent.getRawValue(energyEntity);
  return currentEnergyBytes.length == 0 ? 0 : abi.decode(currentEnergyBytes, (uint32));
}

contract SpawnEntitySystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  address private player1;
  address private player2;
  uint256 private winner;

  function getWinner() public view returns (uint256) {
    return winner;
  }

  function execute(bytes memory arguments) public returns (bytes memory) {
    if(player1 != address(0) && player2 != address(0)) {
      require(player1 == msg.sender || player2 == msg.sender, "Third player not allowed");
    }

    require(winner == 0, "Game has ended");

    if (player1 == address(0)) {
      player1 = msg.sender;
    }

    if (msg.sender != player1 && player2 == address(0)) {
      player2 = msg.sender;
    }

    (uint256 parentEntity, int32 xPosition, int32 yPosition) = abi.decode(arguments, (uint256, int32, int32));
    
    require(xPosition >= 0 && xPosition < 3, "Invalid X co-ordinate");
    require(yPosition >= 0 && yPosition < 3, "Invalid Y co-ordinate");

    PositionComponent positionComponent = PositionComponent(getAddressById(components, PositionComponentID));
    OwnedByComponent ownedByComponent = OwnedByComponent(getAddressById(components, OwnedByComponentID));
    EnergyComponent energyComponent = EnergyComponent(getAddressById(components, EnergyComponentID));
    HasChildComponent hasChildComponent = HasChildComponent(getAddressById(components, HasChildComponentID));
    LastUpdatedTimeComponent lastUpdatedTimeComponent = LastUpdatedTimeComponent(
      getAddressById(components, LastUpdatedTimeComponentID)
    );

    uint256 entity;

    if (xPosition == 0 && yPosition == 0) {
      entity = coord00;
    }
    if (xPosition == 1 && yPosition == 0) {
      entity = coord10;
    }
    if (xPosition == 2 && yPosition == 0) {
      entity = coord20;
    }
    if (xPosition == 0 && yPosition == 1) {
      entity = coord01;
    }
    if (xPosition == 1 && yPosition == 1) {
      entity = coord11;
    }
    if (xPosition == 2 && yPosition == 1) {
      entity = coord21;
    }
    if (xPosition == 0 && yPosition == 1) {
      entity = coord01;
    }
    if (xPosition == 1 && yPosition == 2) {
      entity = coord12;
    }
    if (xPosition == 2 && yPosition == 2) {
      entity = coord22;
    }

    bool entityAlreadyExists = positionComponent.has(entity);
    require(entityAlreadyExists != true, "Entity at this co-ordinate already exists");

    // parentEntity min energy Condition
    if (parentEntity > 0) {
      require(hasChildComponent.getValue(parentEntity) == 0, "Parent Entity already has a child");

      uint32 parentEntityLastUpdatedTime = getLastUpdatedTimeOfEntity(lastUpdatedTimeComponent, parentEntity);
      uint32 time = uint32(block.timestamp);
      if (time > parentEntityLastUpdatedTime) {
        uint32 currentEnergy = getEnergyOfEntity(energyComponent, parentEntity);
        uint32 updatedEnergy = calculateEnergy(uint32(block.timestamp), parentEntityLastUpdatedTime, currentEnergy, energyCap);
        require(updatedEnergy == 30, "Not enough energy regenerated yet for parent entity");
        hasChildComponent.set(parentEntity, 1);
        energyComponent.set(parentEntity, updatedEnergy - childCreationCost); // 30 - 30 = 0
        lastUpdatedTimeComponent.set(parentEntity, uint32(block.timestamp));
      }
    }

    Coord memory coord = Coord({ x: xPosition, y: yPosition });
    positionComponent.set(entity, coord);
    ownedByComponent.set(entity, addressToEntity(msg.sender));
    energyComponent.set(entity, initialEnergy); // 30
    hasChildComponent.set(entity, initialChildren); // 0
    lastUpdatedTimeComponent.set(entity, uint32(block.timestamp));

    // Declare winners
    if (ownedByComponent.getEntitiesWithValue(addressToEntity(msg.sender)).length >= 3) {
      if (msg.sender == player1) {
        winner = 1;
      }

      if (msg.sender == player2) {
        winner = 2;
      }
    }
  }

  function executeTyped(
    uint256 parentEntity,
    int32 xPosition,
    int32 yPosition
  ) public returns (bytes memory) {
    return execute(abi.encode(parentEntity, xPosition, yPosition));
  }
}
