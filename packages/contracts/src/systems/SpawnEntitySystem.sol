// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "solecs/System.sol";
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { getAddressById } from "solecs/utils.sol";
import { PositionComponent, ID as PositionComponentID, Coord } from "../components/PositionComponent.sol";
import { EnergyComponent, ID as EnergyComponentID } from "../components/EnergyComponent.sol";
import { LastUpdatedTimeComponent, ID as LastUpdatedTimeComponentID } from "../components/LastUpdatedTimeComponent.sol";

uint256 constant ID = uint256(keccak256("system.SpawnEntity"));
uint256 constant initialEnergy = 500;

contract SpawnEntitySystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (int32 xPosition, int32 yPosition) = abi.decode(arguments, (int32, int32));

    PositionComponent positionComponent = PositionComponent(getAddressById(components, PositionComponentID));
    EnergyComponent energyComponent = EnergyComponent(getAddressById(components, EnergyComponentID));
    LastUpdatedTimeComponent lastUpdatedTimeComponent = LastUpdatedTimeComponent(getAddressById(components, LastUpdatedTimeComponentID));

    // generate new entity id
    uint256 entity = world.getUniqueEntityId();

    // create object of x and y which we received from user
    Coord memory coord = Coord({ x: xPosition, y: yPosition });

    // assign value to each component
    energyComponent.set(entity, initialEnergy);
    lastUpdatedTimeComponent.set(entity, block.timestamp);
    positionComponent.set(entity, coord);
  }

  function executeTyped(
    int32 xPosition,
    int32 yPosition
  ) public returns (bytes memory) {
    return execute(abi.encode(xPosition, yPosition));
  }
}
