import { Component, EntityID, EntityIndex, getComponentValue, getEntitiesWithValue, setComponent, World } from "@latticexyz/recs";

export const setCharMovePosition = (x: number, y: number, id: EntityIndex, CharMoveComponent: Component) => {
 setComponent(CharMoveComponent, id, { x, y });
}

export function getEntityIndexAtPosition(x: number, y: number, CharMoveComponent: Component): EntityIndex | undefined {
 const entitiesAtPosition = [...getEntitiesWithValue(CharMoveComponent, { x, y })];
 return (
  entitiesAtPosition?.find((b) => {
   const item = getComponentValue(CharMoveComponent, b);
   return item
  }) ?? entitiesAtPosition[0]
 );
}

export function getEntityIdAtPosition(x: number, y: number, CharMoveComponent: Component, world: World): EntityID | undefined {
 const entityIndex = getEntityIndexAtPosition(x, y, CharMoveComponent) as EntityIndex;
 return entityIndex ? world.entities[entityIndex] : undefined
}
