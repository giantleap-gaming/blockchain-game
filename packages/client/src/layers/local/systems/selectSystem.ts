import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { defineComponentSystem, EntityID } from "@latticexyz/recs";
import { NetworkLayer } from "../../network";
import { Assets } from "../../phaser/constants";
import { PhaserLayer } from "../../phaser/types";

export function selectSystem(network: NetworkLayer, phaser: PhaserLayer) {
 const {
  world,
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
  localComponents: {
   Select,
   Move
  },
  localIds: {
   selectionEntityId
  },
  localApi: {
   setSelectPosition,
   getEntityIdAtPosition,
  }
 } = phaser;


 const clickSub = input.click$.subscribe((p) => {
  const pointer = p as Phaser.Input.Pointer;
  const { x, y } = pixelCoordToTileCoord({ x: pointer.worldX, y: pointer.worldY }, tileWidth, tileHeight);
  if (x > -1 && y > -1 && x < 10 && y < 10) {
   const charEntityID = getEntityIdAtPosition(x, y, Move, world) as EntityID;
   if (charEntityID) {
    setSelectPosition(x, y, true, selectionEntityId, Select, charEntityID)
   }
  }
  world.registerDisposer(() => clickSub?.unsubscribe());


  defineComponentSystem(world, Select, (update) => {
   const position = update.value[0];
   if (!position?.show) return console.warn("nothing selected");
   const object = objectPool.get(update.entity, "Sprite");
   const { x, y } = tileCoordToPixelCoord(position, tileWidth, tileHeight);
   const sprite = config.assets[Assets.Select];
   object.setComponent({
    id: Select.id,
    once: (gameObject) => {
     gameObject.setTexture(Assets.Select, sprite.path);
     gameObject.setPosition(x, y);
     gameObject.depth = 2
    },
   });
  });
 });
}
