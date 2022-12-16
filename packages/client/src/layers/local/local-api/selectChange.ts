import { Component, EntityIndex, setComponent } from "@latticexyz/recs";

export const setSelectPosition = (x: number, y: number, show: boolean, id: EntityIndex, SelectComponent: Component) => {
 setComponent(SelectComponent, id, { x, y, show });
}
