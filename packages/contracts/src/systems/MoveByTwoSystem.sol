// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "solecs/System.sol";
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { getAddressById } from "solecs/utils.sol";
import { PositionComponent, ID as PositionComponentID, Coord } from "../components/PositionComponent.sol";
import { EnergyComponent, ID as EnergyComponentID } from "../components/EnergyComponent.sol";
import { LastUpdatedTimeComponent, ID as LastUpdatedTimeComponentID } from "../components/LastUpdatedTimeComponent.sol";
import { calculateEnergy } from "../utils.sol";

uint256 constant ID = uint256(keccak256("system.MoveByTwo"));
uint256 constant energyCap = 1000;
uint256 constant costPerMove = 30;

function getCurrentPosition(PositionComponent positionComponent, uint256 entity) view returns (Coord memory) {
  (int32 x, int32 y) = abi.decode(positionComponent.getRawValue(entity), (int32, int32));
  return Coord(x, y);
}

function getEnergyOfEntity(EnergyComponent energyComponent, uint256 energyEntity) view returns (uint256) {
  bytes memory currentEnergyBytes = energyComponent.getRawValue(energyEntity);
  return currentEnergyBytes.length == 0 ? 0 : abi.decode(currentEnergyBytes, (uint256));
}

function getLastUpdatedTimeOfEntity(LastUpdatedTimeComponent lastUpdatedTimeComponent, uint256 lastUpdatedTimeEntity) view returns (uint256) {
  bytes memory currentEntityLastUpdatedTimeBytes = lastUpdatedTimeComponent.getRawValue(lastUpdatedTimeEntity);
  return currentEntityLastUpdatedTimeBytes.length == 0 ? 0 : abi.decode(currentEntityLastUpdatedTimeBytes, (uint256));
}

contract MoveByTwoSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 entity, uint256 action) = abi.decode(arguments, (uint256, uint256));

    PositionComponent positionComponent = PositionComponent(getAddressById(components, PositionComponentID));
    EnergyComponent energyComponent = EnergyComponent(getAddressById(components, EnergyComponentID));
    LastUpdatedTimeComponent lastUpdatedTimeComponent = LastUpdatedTimeComponent(getAddressById(components, LastUpdatedTimeComponentID));

    uint256 currentEnergy = getEnergyOfEntity(energyComponent, entity);
    uint256 currentEntityLastUpdatedTime = getLastUpdatedTimeOfEntity(lastUpdatedTimeComponent, entity);

    if (block.timestamp > currentEntityLastUpdatedTime) {
      uint updatedEnergy = calculateEnergy(block.timestamp, currentEntityLastUpdatedTime, currentEnergy, energyCap);
      energyComponent.set(entity, updatedEnergy);
      currentEnergy = updatedEnergy;
    }
    energyComponent.set(entity, currentEnergy - costPerMove);
    lastUpdatedTimeComponent.set(entity, block.timestamp);
    // Move position of entity
    Coord memory entityPosition = getCurrentPosition(positionComponent, entity);
    // MoveUp By Two
    if (action == 1) {
      entityPosition.y += 2;
    }
    // MoveDown By Two
    if (action == 2) {
      entityPosition.y -= 2;
    }
    // MoveLeft By Two
    if (action == 3) {
      entityPosition.x -= 2;
    }
    // MoveRight By Two
    if (action == 4) {
      entityPosition.x += 2;
    }
    positionComponent.set(entity, entityPosition);
  }

  function executeTyped(
    uint256 entity,
    uint256 action
  ) public returns (bytes memory) {
    return execute(abi.encode(entity, action));
  }
}
