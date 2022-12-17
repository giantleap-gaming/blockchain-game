import { Component, EntityIndex, setComponent } from "@latticexyz/recs";

export const foodDetailsChange = (x: number, y: number, show: boolean, id: EntityIndex, FoodComponent: Component) => {
 setComponent(FoodComponent, id, { x, y, show });
}
