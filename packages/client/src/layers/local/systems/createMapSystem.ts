import { NetworkLayer } from "../../network";
import { Assets } from "../../phaser/constants";
import { PhaserLayer } from "../../phaser/types";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

export function createMapSystem(network: NetworkLayer, phaser: PhaserLayer) {
 const {
  localComponents: {
   AirDetails, FoodDetails, PowerDetails, Move
  },
  localApi: {
   airDetailsChange,
   foodDetailsChange,
   powerDetailsChange,
   setCharMovePosition
  },
  localIds: {
   foodDetailsEntityId,
   oxygenDetailsEntityId,
   powerDetailsEntityId,
   char1EntityId,
   char2EntityId
  },
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
 const { x, y } = tileCoordToPixelCoord({ x: 5, y: 5 }, tileWidth, tileHeight)
 const { x: bodyx, y: bodyy } = tileCoordToPixelCoord({ x: 5, y: 2 }, tileWidth, tileHeight)
 const { x: thx, y: thy } = tileCoordToPixelCoord({ x: 3, y: 11.5 }, tileWidth, tileHeight)
 const { x: thx1, y: thy1 } = tileCoordToPixelCoord({ x: 7, y: 11.5 }, tileWidth, tileHeight)
 phaserScene.add.sprite(bodyx, bodyy, Assets.Body)
 phaserScene.add.sprite(x, y, Assets.Box)
 phaserScene.add.sprite(thx1, thy1, Assets.thruster)
 phaserScene.add.sprite(thx, thy, Assets.thruster)
 airDetailsChange(1, 1, true, oxygenDetailsEntityId, AirDetails)
 foodDetailsChange(4, 1, true, foodDetailsEntityId, FoodDetails)
 powerDetailsChange(7, 1, true, powerDetailsEntityId, PowerDetails)

 setCharMovePosition(2, 9, char1EntityId, Move)
 setCharMovePosition(7, 9, char2EntityId, Move)

 camera.centerOn(0, 0)
}
