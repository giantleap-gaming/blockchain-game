import { defineComponentSystem, EntityID } from "@latticexyz/recs";
import { NetworkLayer } from "../../network";
import { PhaserLayer } from "../types";

export function displayEnergyPositionSystem(networkLayer: NetworkLayer, phaser: PhaserLayer) {
  const {
    world,
    components: { Energy, Position },
    network
  } = networkLayer;

  const {
    scenes: {
      Main: {
        phaserScene,
      },
    },
  } = phaser;
  const positionText = phaserScene.add.text(115, 1, 'Position').setScrollFactor(0, 0).setDepth(100);
  const energyText = phaserScene.add.text(1, 1, 'Energy').setScrollFactor(0, 0).setDepth(100);

  defineComponentSystem(world, Position, (update) => {
    const entityId = network.connectedAddress.get() as EntityID
    const objectId = Position.world.getEntityIndexStrict(entityId)
    const position = update.value[0];
    if (!position) return console.warn("no position");
    if (objectId === update.entity) {
      positionText.setText(`Position X:${position.x} Y:${position.y}`)
    }
  });
  defineComponentSystem(world, Energy, (update) => {
    const energy = update.value[0];
    const entityId = network.connectedAddress.get() as EntityID
    const objectId = Energy.world.getEntityIndexStrict(entityId)
    if (!energy) return console.warn("no Energy");
    if (objectId === update.entity && energy?.value) {
      energyText.setText(`Energy ${energy.value}`)
    }
  });
}
