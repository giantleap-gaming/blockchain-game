import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { defineComponentSystem, EntityID, EntityIndex } from "@latticexyz/recs";
import { NetworkLayer } from "../../network";
import { Assets, Sprites } from "../constants";
import { PhaserLayer } from "../types";

export function createSelectSystem(network: NetworkLayer, phaser: PhaserLayer) {
 const {
  world,
  api: {
   spawnEntity
  },
  components: {
   Position
  },
  utils: {
   getEntityIdAtPosition
  }
 } = network;

 const {
  scenes: {
   Main: {
    objectPool,
    config,
    input,
    maps: {
     Main: { tileWidth, tileHeight, },
    },
   },
  },
  components: { Selected },
  api: {
   selectArea,
   setEnergy
  }
 } = phaser;


 const clickSub = input.click$.subscribe((p) => {
  const pointer = p as Phaser.Input.Pointer;
  const tilePos = pixelCoordToTileCoord({ x: pointer.worldX, y: pointer.worldY }, tileWidth, tileHeight);
  // spawnEntity(tilePos.x, tilePos.y, '0' as EntityID)
  selectArea(tilePos.x, tilePos.y, true)
  const entityID = getEntityIdAtPosition(tilePos.x, tilePos.y) as EntityID
  if (entityID !== undefined) {
   setEnergy(0, true)
  } else {
   setEnergy(0, false)
  }
 });
 world.registerDisposer(() => clickSub?.unsubscribe());

 defineComponentSystem(world, Selected, (update) => {
  const position = update.value[0];
  if (!position?.show) return console.warn("nothing selected");
  const object = objectPool.get(update.entity, "Sprite");
  const { x, y } = tileCoordToPixelCoord(position, tileWidth, tileHeight);
  const sprite = config.assets[Assets.Select];
  object.setComponent({
   id: Selected.id,
   once: (gameObject) => {
    gameObject.setTexture(Assets.Select, sprite.path);
    gameObject.setPosition(x, y);
    gameObject.depth = 2
   },
  });
 });

}
