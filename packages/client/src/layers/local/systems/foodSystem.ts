
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { defineComponentSystem } from "@latticexyz/recs";
import { NetworkLayer } from "../../network";
import { Assets } from "../../phaser/constants";
import { PhaserLayer } from "../../phaser/types";

export function foodSystem(network: NetworkLayer, phaser: PhaserLayer) {
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
   FoodDetails
  },
 } = phaser;
 defineComponentSystem(world, FoodDetails, (update) => {
  const position = update.value[0];
  if (!position?.show) return console.warn("nothing selected");
  const object = objectPool.get(update.entity, "Sprite");
  const { x, y } = tileCoordToPixelCoord(position, tileWidth, tileHeight);
  const sprite = config.assets[Assets.Select];
  object.setComponent({
   id: FoodDetails.id,
   once: (gameObject) => {
    gameObject.setTexture(Assets.food, sprite.path);
    gameObject.setPosition(x, y);
    gameObject.depth = 3
   },
  });
 });
}
