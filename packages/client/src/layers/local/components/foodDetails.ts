import { defineComponent, Type, World } from "@latticexyz/recs";

export const foodDetails = (world: World) => {
 return defineComponent(
  world,
  { x: Type.Number, y: Type.Number, show: Type.Boolean },
  {
   id: "foodDetails"
  },

 )
}
