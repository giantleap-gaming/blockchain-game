import { defineComponentSystem } from "@latticexyz/recs";
import { NetworkLayer } from "../../network";
import { PhaserLayer } from "../types";

export function energySystem(network: NetworkLayer, phaser: PhaserLayer) {
  const { world } = network;

  const {
    scenes: {
      Main: {
        phaserScene,
      },
    },
    components: { Energy },
  } = phaser;

  const currentEnergyBar = phaserScene.add.graphics()
  const grayEnergyBar = phaserScene.add.graphics()

  defineComponentSystem(world, Energy, (update) => {
    const energy = update.value[0];
    if (!energy?.show) {
      grayEnergyBar.visible = false
      currentEnergyBar.visible = false
    } else {
      grayEnergyBar.visible = true
      currentEnergyBar.visible = true
      grayEnergyBar.fillStyle(0x999999, 1);
      grayEnergyBar.fillRect(1, -50, 30, 5);
      if (energy?.energy) {
        currentEnergyBar.fillStyle(0x00ff00, 1);
        currentEnergyBar.depth = 2
        currentEnergyBar.fillRect(1, -50, energy.energy, 5)
      }
    }
  })
}
