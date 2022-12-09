// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

function calculateEnergy(uint256 currentTime, uint256 lastUpdatedTime, uint256 currentEnergy, uint256 energyCap) pure returns (uint256) {
  uint256 _timeDiffInSeconds = currentTime - lastUpdatedTime;
  uint256 _energyIncrementValue = _timeDiffInSeconds; // 1 energy point per second
  uint256 _newEnergy = currentEnergy + _energyIncrementValue;
  _newEnergy = energyCap < _newEnergy ? energyCap : _newEnergy;
  return _newEnergy;
}
