import { NetworkLayer } from "../../network";
import { Assets } from "../../phaser/constants";
import { PhaserLayer } from "../../phaser/types";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

export function createMapSystem(network: NetworkLayer, phaser: PhaserLayer) {
 const {
  scenes: {
   Main: {
    phaserScene,
    camera,
    maps: {
     Main: {
      tileWidth, tileHeight
     }
    }
   },

  },
 } = phaser;
 for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
   const { x, y } = tileCoordToPixelCoord({ x: i - .5, y: j - .5 }, tileWidth, tileHeight)
   phaserScene.add.sprite(x, y, Assets.Box)
  }
 }
 camera.centerOn(0, 0)
}
