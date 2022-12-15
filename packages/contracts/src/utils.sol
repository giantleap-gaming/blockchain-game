// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

import { PositionComponent, Coord } from "./components/PositionComponent.sol";
import { OwnedByComponent } from "./components/OwnedByComponent.sol";
import { EnergyComponent } from "./components/EnergyComponent.sol";
import { HasChildComponent } from "./components/HasChildComponent.sol";
import { LastUpdatedTimeComponent } from "./components/LastUpdatedTimeComponent.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";

function getCurrentChildCount(HasChildComponent hasChildComponent, uint256 entity) view returns (uint256) {
  bytes memory currentChildCountBytes = hasChildComponent.getRawValue(entity);
  return currentChildCountBytes.length == 0 ? 0 : abi.decode(currentChildCountBytes, (uint256));
}

function getLastUpdatedTimeOfEntity(LastUpdatedTimeComponent lastUpdatedTimeComponent, uint256 lastUpdatedTimeEntity)
  view
  returns (uint256)
{
  bytes memory currentEntityLastUpdatedTimeBytes = lastUpdatedTimeComponent.getRawValue(lastUpdatedTimeEntity);
  return currentEntityLastUpdatedTimeBytes.length == 0 ? 0 : abi.decode(currentEntityLastUpdatedTimeBytes, (uint256));
}

function calculateEnergy(
  uint256 currentTime,
  uint256 lastUpdatedTime,
  uint256 currentEnergy,
  uint256 energyCap
) pure returns (uint256) {
  uint256 _timeDiffInSeconds = currentTime - lastUpdatedTime;
  uint256 _energyIncrementValue = _timeDiffInSeconds; // +1 energy per second
  uint256 _newEnergy = currentEnergy + _energyIncrementValue;
  _newEnergy = energyCap < _newEnergy ? energyCap : _newEnergy;
  return _newEnergy;
}

function getEnergyOfEntity(EnergyComponent energyComponent, uint256 energyEntity) view returns (uint256) {
  bytes memory currentEnergyBytes = energyComponent.getRawValue(energyEntity);
  return currentEnergyBytes.length == 0 ? 0 : abi.decode(currentEnergyBytes, (uint256));
}
