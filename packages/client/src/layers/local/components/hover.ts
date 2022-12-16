import { defineComponent, Type, World } from "@latticexyz/recs";

export const hover = (world: World) => {
 return defineComponent(
  world,
  { x: Type.Number, y: Type.Number, show: Type.Boolean },
  { id: "hover" }
 )
}
