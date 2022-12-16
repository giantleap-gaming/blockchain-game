import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { defineComponentSystem } from "@latticexyz/recs";
import { NetworkLayer } from "../../network";
import { PhaserLayer } from "../../phaser";
import { Assets } from "../../phaser/constants";

export function hoverSystem(network: NetworkLayer, phaser: PhaserLayer) {
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
  localComponents: { Hover },
  localApi: {
   setHoverPosition
  },
  localIds: {
   hoverEntityId
  }
 } = phaser;


 const hoverSub = input.pointermove$.subscribe((p) => {
  const { pointer } = p;
  const { x, y } = pixelCoordToTileCoord({ x: pointer.worldX, y: pointer.worldY }, tileWidth, tileHeight);
  if (x > -1 && y > -1 && x < 10 && y < 10) {
   setHoverPosition(x, y, true, hoverEntityId, Hover)
  } else {
   setHoverPosition(0, 0, false, hoverEntityId, Hover)
  }
 });
 world.registerDisposer(() => hoverSub?.unsubscribe());


 defineComponentSystem(world, Hover, (update) => {
  const object = objectPool.get(update.entity, "Sprite");
  const position = update.value[0];
  const { x, y } = tileCoordToPixelCoord({ x: position?.x || 0, y: position?.y || 0 }, tileWidth, tileHeight);
  const sprite = config.assets[Assets.Hover];
  object.setComponent({
   id: Hover.id,
   once: (gameObject) => {
    gameObject.setTexture(Assets.Hover, sprite.path);
    gameObject.setPosition(x, y);
    gameObject.depth = 2
    gameObject.visible = position?.show || false
   },
  });
 });
}
