import { defineComponent, Type, World } from "@latticexyz/recs";

export const powerDetails = (world: World) => {
 return defineComponent(
  world,
  { x: Type.Number, y: Type.Number, show: Type.Boolean },
  { id: "powerDetails" }
 )
}