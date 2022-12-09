import { EntityID } from "@latticexyz/recs";
import { NetworkLayer } from "../../network";
import { PhaserLayer } from "../types";

export function createInputSystem(natworkLayer: NetworkLayer, phaser: PhaserLayer) {
  const {
    world,
    scenes: {
      Main: { input },
    },
  } = phaser;
  const {
    components: { Position },
    network,
  } = natworkLayer;
  const keyup = input.keyboard$.subscribe((p) => {
    const keyboard = p as Phaser.Input.Keyboard.Key;
    try {
      const entityId = network.connectedAddress.get() as EntityID
      const objectId = Position.world.getEntityIndexStrict(entityId)
      if (!objectId) {
        return
      }
      if (keyboard.isUp) {
        if (keyboard.keyCode === 87) {
          natworkLayer.api.move(2, false);
          // console.log("rotate right");
        }
        if (keyboard.keyCode === 65) {
          natworkLayer.api.move(3, false);
          // console.log("rotate left");
        }
        if (keyboard.keyCode === 68) {
          // console.log("move forward");
          natworkLayer.api.move(4, false);
        }
        if (keyboard.keyCode === 83) {
          // console.log("backward");
          natworkLayer.api.move(1, false);
        }
        if (keyboard.keyCode === 73) {
          natworkLayer.api.moveByTwo(2);
          // console.log("rotate right");
        }
        if (keyboard.keyCode === 75) {
          natworkLayer.api.moveByTwo(1);
          // console.log("rotate left");
        }
        if (keyboard.keyCode === 76) {
          // console.log("move forward");
          natworkLayer.api.moveByTwo(4);
        }
        if (keyboard.keyCode === 74) {
          // console.log("backward");
          natworkLayer.api.moveByTwo(3);
        }
      }
    } catch (error: any) {
      if (error.message === 'entity does not exist') {
        natworkLayer.api.move(3, true);
      }
    }
  });
  world.registerDisposer(() => {
    keyup?.unsubscribe();
  });
}
