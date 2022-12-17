import { Component, EntityID, EntityIndex, setComponent } from "@latticexyz/recs";

export const setSelectPosition = (x: number, y: number, show: boolean, id: EntityIndex, SelectComponent: Component, charSelectedEntityId?: EntityID) => {
 setComponent(SelectComponent, id, { x, y, show, charSelectedEntityId });
}
