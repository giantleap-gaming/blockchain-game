import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { defineComponentSystem, EntityID } from "@latticexyz/recs";
import { NetworkLayer } from "../../network";
import { Assets } from "../../phaser/constants";
import { PhaserLayer } from "../../phaser/types";

export function selectSystem(network: NetworkLayer, phaser: PhaserLayer) {
 const { utils: { getEntityIdAtPosition } } = network
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
   Select
  },
  localIds: {
   selectionEntityId
  },
  localApi: {
   setSelectPosition
  }
 } = phaser;


 const clickSub = input.click$.subscribe((p) => {
  const pointer = p as Phaser.Input.Pointer;
  const tilePos = pixelCoordToTileCoord({ x: pointer.worldX, y: pointer.worldY }, tileWidth, tileHeight);
  setSelectPosition(tilePos.x, tilePos.y, true, selectionEntityId, Select)
  const entityID = getEntityIdAtPosition(tilePos.x, tilePos.y) as EntityID;
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
