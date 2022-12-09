// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "solecs/System.sol";
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { getAddressById } from "solecs/utils.sol";
import { PositionComponent, ID as PositionComponentID, Coord } from "../components/PositionComponent.sol";
import { EnergyComponent, ID as EnergyComponentID } from "../components/EnergyComponent.sol";
import { LastUpdatedTimeComponent, ID as LastUpdatedTimeComponentID } from "../components/LastUpdatedTimeComponent.sol";
import { calculateEnergy } from "../utils.sol";

uint256 constant ID = uint256(keccak256("system.Move"));
uint256 constant energyCap = 1000;
uint256 constant costPerMove = 10;
uint256 constant initialEnergy = 500;

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

contract MoveSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 entity, uint256 action, bool firstTime) = abi.decode(arguments, (uint256, uint256, bool));

    PositionComponent positionComponent = PositionComponent(getAddressById(components, PositionComponentID));
    EnergyComponent energyComponent = EnergyComponent(getAddressById(components, EnergyComponentID));
    LastUpdatedTimeComponent lastUpdatedTimeComponent = LastUpdatedTimeComponent(getAddressById(components, LastUpdatedTimeComponentID));

    uint256 currentEnergy = firstTime ? initialEnergy : getEnergyOfEntity(energyComponent, entity);
    uint256 currentEntityLastUpdatedTime = firstTime ? 0 : getLastUpdatedTimeOfEntity(lastUpdatedTimeComponent, entity);

    if (currentEntityLastUpdatedTime > 0 && block.timestamp > currentEntityLastUpdatedTime) {
      uint256 updatedEnergy = calculateEnergy(block.timestamp, currentEntityLastUpdatedTime, currentEnergy, energyCap);
      energyComponent.set(entity, updatedEnergy);
      currentEnergy = updatedEnergy;
    }

    if (firstTime) {
      Coord memory coord = Coord({ x: 1, y: 1 });
      positionComponent.set(entity, coord);
      energyComponent.set(entity, initialEnergy);
    } else {
      energyComponent.set(entity, currentEnergy - costPerMove);
      // Move position of entity
      Coord memory entityPosition = getCurrentPosition(positionComponent, entity);
      // MoveUp
      if (action == 1) {
        entityPosition.y += 1;
      }
      // MoveDown
      if (action == 2) {
        entityPosition.y -= 1;
      }
      // MoveLeft
      if (action == 3) {
        entityPosition.x -= 1;
      }
      // MoveRight
      if (action == 4) {
        entityPosition.x += 1;
      }
      positionComponent.set(entity, entityPosition);
    }
    lastUpdatedTimeComponent.set(entity, block.timestamp);
  }

  function executeTyped(
    uint256 entity,
    uint256 action,
    bool firstTime
  ) public returns (bytes memory) {
    return execute(abi.encode(entity, action, firstTime));
  }
}
