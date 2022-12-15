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
import { initialEnergy, energyCap, childCreationCost, initialChildren } from "../constants.sol";
import { calculateEnergy, getEnergyOfEntity, getLastUpdatedTimeOfEntity } from "../utils.sol";

uint256 constant ID = uint256(keccak256("system.SpawnEntity"));

uint256 constant coord00 = uint256(keccak256("00"));
uint256 constant coord10 = uint256(keccak256("10"));
uint256 constant coord20 = uint256(keccak256("20"));
uint256 constant coord01 = uint256(keccak256("01"));
uint256 constant coord11 = uint256(keccak256("11"));
uint256 constant coord21 = uint256(keccak256("21"));
uint256 constant coord02 = uint256(keccak256("02"));
uint256 constant coord12 = uint256(keccak256("12"));
uint256 constant coord22 = uint256(keccak256("22"));

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

    if(parentEntity == 0) {
      require(ownedByComponent.getEntitiesWithValue(addressToEntity(msg.sender)).length == 0, "Need parent entity ID to create a child entity");
    }

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
      require(ownedByComponent.getValue(parentEntity) == addressToEntity(msg.sender), "Parent Entity is not owned by user");
      require(hasChildComponent.getValue(parentEntity) == 0, "Parent Entity already has a child");

      uint256 parentEntityLastUpdatedTime = getLastUpdatedTimeOfEntity(lastUpdatedTimeComponent, parentEntity);

      if (block.timestamp > parentEntityLastUpdatedTime) {
        uint256 currentEnergy = getEnergyOfEntity(energyComponent, parentEntity);
        uint256 updatedEnergy = calculateEnergy(block.timestamp, parentEntityLastUpdatedTime, currentEnergy, energyCap);
        require(updatedEnergy == 30, "Not enough energy regenerated yet for parent entity");
        hasChildComponent.set(parentEntity, 1);
        energyComponent.set(parentEntity, updatedEnergy - childCreationCost); // 30 - 30 = 0
        lastUpdatedTimeComponent.set(parentEntity, block.timestamp);
      }
    }

    Coord memory coord = Coord({ x: xPosition, y: yPosition });
    positionComponent.set(entity, coord);
    ownedByComponent.set(entity, addressToEntity(msg.sender));
    energyComponent.set(entity, initialEnergy);
    hasChildComponent.set(entity, initialChildren);
    lastUpdatedTimeComponent.set(entity, block.timestamp);

    // Declare winners
    if (ownedByComponent.getEntitiesWithValue(addressToEntity(msg.sender)).length >= 3) {
      // Old 3 player winner logic
      if (msg.sender == player1) {
        winner = 0; // should be '1' for 3 entities-creator win logic
      }
      if (msg.sender == player2) {
        winner = 0; // should be '2' for 3 entities-creator win logic
      }

      //
      // NEW LOGIC BELOW. BUT KEEP CODE COMMENTED.
      //
      
      // uint256 me = addressToEntity(msg.sender);
      // struct CoOrdniates {
      //   bool zeroZero;
      //   bool oneZero;
      //   bool twoZero;
      //   bool zeroOne;
      //   bool oneOne;
      //   bool twoOne;
      //   bool zeroTwo;
      //   bool oneTwo;
      //   bool twoTwo;
      // }

      // CoOrdniates.zeroZero = ownedByComponent.getValue(coord00) == me;
      // CoOrdniates.oneZero = ownedByComponent.getValue(coord10) == me;
      // CoOrdniates.twoZero = ownedByComponent.getValue(coord20) == me;
      // CoOrdniates.zeroOne = ownedByComponent.getValue(coord01) == me;
      // CoOrdniates.oneOne = ownedByComponent.getValue(coord11) == me;
      // CoOrdniates.twoOne = ownedByComponent.getValue(coord21) == me;
      // CoOrdniates.zeroTwo = ownedByComponent.getValue(coord02) == me;
      // CoOrdniates.oneTwo = ownedByComponent.getValue(coord12) == me;
      // CoOrdniates.twoTwo = ownedByComponent.getValue(coord22) == me;
      
      // if (
      //     // horizontal win check
      //     (CoOrdniates.zeroZero && CoOrdniates.oneZero && CoOrdniates.twoZero) ||
      //     (CoOrdniates.zeroOne && CoOrdniates.oneOne && CoOrdniates.twoOne) ||
      //     (CoOrdniates.zeroTwo && CoOrdniates.oneTwo && CoOrdniates.twoTwo) ||
      //     // vertical win check
      //     (CoOrdniates.zeroZero && CoOrdniates.zeroOne && CoOrdniates.zeroTwo) ||
      //     (CoOrdniates.oneZero && CoOrdniates.oneOne && CoOrdniates.oneTwo) ||
      //     (CoOrdniates.twoZero && CoOrdniates.twoOne && CoOrdniates.twoTwo) ||
      //     // diagonal win check
      //     (CoOrdniates.zeroZero && CoOrdniates.oneOne && CoOrdniates.twoTwo) ||
      //     (CoOrdniates.zeroTwo && CoOrdniates.oneOne && CoOrdniates.twoZero)
      //     ) {
      //       if (msg.sender == player1) {
      //         winner = 1;
      //       } else {
      //         winner = 2;
      //       }
      //   }
      // }
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
