import { Component, EntityIndex, setComponent } from "@latticexyz/recs";

export const airDetailsChange = (x: number, y: number, show: boolean, id: EntityIndex, AirComponent: Component) => {
 setComponent(AirComponent, id, { x, y, show });
}
