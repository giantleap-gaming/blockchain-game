import { NetworkLayer } from "../../network";
import { Assets } from "../constants";
import { PhaserLayer } from "../types";

export function createMapSystem(network: NetworkLayer, phaser: PhaserLayer) {
 const {
  scenes: {
   Main: {
    phaserScene,
    camera,
   },
  },
 } = phaser;

 phaserScene.add.sprite(8, 8, Assets.Box)
 phaserScene.add.sprite(24, 8, Assets.Box)
 phaserScene.add.sprite(40, 8, Assets.Box)

 phaserScene.add.sprite(8, 24, Assets.Box)
 phaserScene.add.sprite(24, 24, Assets.Box)
 phaserScene.add.sprite(40, 24, Assets.Box)

 phaserScene.add.sprite(8, 40, Assets.Box)
 phaserScene.add.sprite(24, 40, Assets.Box)
 phaserScene.add.sprite(40, 40, Assets.Box)

 camera.centerOn(0, 0)
}
