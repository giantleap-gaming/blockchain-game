import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { defineComponentSystem, EntityIndex, getComponentValue } from "@latticexyz/recs";
import { NetworkLayer } from "../../network";
import { PhaserLayer } from "../../phaser";
import { Assets } from "../../phaser/constants";

export function moveSystem(network: NetworkLayer, phaser: PhaserLayer) {
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
  localComponents: { Move, Select },
  localApi: {
   setCharMovePosition,
   setSelectPosition
  },
  localIds: {
   selectionEntityId,
  }
 } = phaser;


 const hoverSub = input.keyboard$.subscribe((p) => {
  const keyboard = p as Phaser.Input.Keyboard.Key
  if (keyboard.isUp) {
   if ([65, 87, 83, 68].includes(keyboard.keyCode)) {
    const selectedValues = getComponentValue(Select, selectionEntityId)
    if (selectedValues?.charSelectedEntityId) {
     const charIndex = +selectedValues?.charSelectedEntityId as EntityIndex
     const charEntityDetails = getComponentValue(Move, charIndex)
     if (charEntityDetails) {
      if (keyboard.keyCode === 65) {
       const x = charEntityDetails?.x - 1
       const y = charEntityDetails?.y
       if (x > -1 && y > -1 && x < 10 && y < 10) {
        setCharMovePosition(x, y, charIndex, Move)
        setSelectPosition(x, y, true, selectionEntityId, Select, selectedValues?.charSelectedEntityId)
       }
      }
      if (keyboard.keyCode === 87) {
       const x = charEntityDetails?.x
       const y = charEntityDetails?.y - 1
       if (x > -1 && y > -1 && x < 10 && y < 10) {
        setCharMovePosition(x, y, charIndex, Move)
        setSelectPosition(x, y, true, selectionEntityId, Select, selectedValues?.charSelectedEntityId)
       }
      }
      if (keyboard.keyCode === 83) {
       const x = charEntityDetails?.x
       const y = charEntityDetails?.y + 1
       if (x > -1 && y > -1 && x < 10 && y < 10) {
        setCharMovePosition(x, y, charIndex, Move)
        setSelectPosition(x, y, true, selectionEntityId, Select, selectedValues?.charSelectedEntityId)
       }
      }
      if (keyboard.keyCode === 68) {
       const x = charEntityDetails?.x + 1
       const y = charEntityDetails?.y
       if (x > -1 && y > -1 && x < 10 && y < 10) {
        setCharMovePosition(x, y, charIndex, Move)
        setSelectPosition(x, y, true, selectionEntityId, Select, selectedValues?.charSelectedEntityId)
       }
      }
     }
    }
   }
  }
 });
 world.registerDisposer(() => hoverSub?.unsubscribe());


 defineComponentSystem(world, Move, (update) => {
  const object = objectPool.get(update.entity, "Sprite");
  const position = update.value[0];
  const { x, y } = tileCoordToPixelCoord({ x: position?.x || 0, y: position?.y || 0 }, tileWidth, tileHeight);
  const sprite = config.assets[Assets.Char];
  object.setComponent({
   id: Move.id,
   once: (gameObject) => {
    gameObject.setTexture(Assets.Char, sprite.path);
    gameObject.setPosition(x, y);
    gameObject.depth = 4
   },
  });
 });
}
