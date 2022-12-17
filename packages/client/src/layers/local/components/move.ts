import { defineComponent, Type, World } from "@latticexyz/recs";

export const move = (world: World) => {
 return defineComponent(
  world,
  { x: Type.Number, y: Type.Number },
  { id: "move" }
 )
}
