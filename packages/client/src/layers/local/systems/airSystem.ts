
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { defineComponentSystem } from "@latticexyz/recs";
import { NetworkLayer } from "../../network";
import { Assets } from "../../phaser/constants";
import { PhaserLayer } from "../../phaser/types";

export function airSystem(network: NetworkLayer, phaser: PhaserLayer) {
 const {
  world,
  scenes: {
   Main: {
    objectPool,
    config,
    maps: {
     Main: { tileWidth, tileHeight, },
    },
   },
  },
  localComponents: {
   AirDetails
  },
 } = phaser;
 defineComponentSystem(world, AirDetails, (update) => {
  const position = update.value[0];
  if (!position?.show) return console.warn("nothing selected");
  const object = objectPool.get(update.entity, "Sprite");
  const { x, y } = tileCoordToPixelCoord(position, tileWidth, tileHeight);
  const sprite = config.assets[Assets.Select];
  object.setComponent({
   id: AirDetails.id,
   once: (gameObject) => {
    gameObject.setTexture(Assets.air, sprite.path);
    gameObject.setPosition(x, y);
    gameObject.depth = 3
   },
  });
 });
}
