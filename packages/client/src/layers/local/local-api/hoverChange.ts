import { Component, EntityIndex, setComponent } from "@latticexyz/recs";

export const setHoverPosition = (x: number, y: number, show: boolean, id: EntityIndex, HoverComponent: Component) => {
 setComponent(HoverComponent, id, { x, y, show });
}
