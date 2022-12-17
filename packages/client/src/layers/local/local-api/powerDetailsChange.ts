import { Component, EntityIndex, setComponent } from "@latticexyz/recs";

export const powerDetailsChange = (x: number, y: number, show: boolean, id: EntityIndex, PowerComponent: Component) => {
 setComponent(PowerComponent, id, { x, y, show });
}
