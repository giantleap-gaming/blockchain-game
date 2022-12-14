import { createWorld, defineComponent, EntityID, EntityIndex, Type, updateComponent } from "@latticexyz/recs";
import { setupDevSystems } from "./setup";
import { createActionSystem, setupMUDNetwork, defineCoordComponent, defineNumberComponent } from "@latticexyz/std-client";
import { defineLoadingStateComponent } from "./components";
import { SystemTypes } from "contracts/types/SystemTypes";
import { SystemAbis } from "contracts/types/SystemAbis.mjs";
import { GameConfig, getNetworkConfig } from "./config";
import { BigNumber } from "ethers";


export async function createNetworkLayer(config: GameConfig) {
  // --- WORLD ----------------------------------------------------------------------
  const world = createWorld();

  // --- COMPONENTS -----------------------------------------------------------------
  const components = {
    LoadingState: defineLoadingStateComponent(world),
    Position: defineCoordComponent(world, { id: "Position", metadata: { contractId: "component.Position" } }),
    Energy: defineNumberComponent(world,
      { id: "Energy", metadata: { contractId: "component.Energy" } }),
    HasChild: defineComponent(world,
      { value: Type.String }
      , { id: "HasChild", metadata: { contractId: "component.HasChild" } }),
    LastUpdatedTime: defineComponent(world,
      { value: Type.String }
      , { id: "LastUpdatedTime", metadata: { contractId: "component.LastUpdatedTime" } }),
    OwnedBy: defineComponent(world,
      { value: Type.String }
      , { id: "OwnedBy", metadata: { contractId: "component.OwnedBy" } })
  };
  // --- SETUP ----------------------------------------------------------------------
  const { txQueue, systems, txReduced$, network, startSync, encoders } = await setupMUDNetwork<
    typeof components,
    SystemTypes
  >(getNetworkConfig(config), world, components, SystemAbis);

  // --- ACTION SYSTEM --------------------------------------------------------------
  const actions = createActionSystem(world, txReduced$);
  // --- API ------------------------------------------------------------------------
  function spawnEntity(x: number, y: number, entity: EntityID) {
    systems["system.SpawnEntity"].executeTyped(BigNumber.from(entity), x, y);
  }

  // --- CONTEXT --------------------------------------------------------------------
  const context = {
    world,
    components,
    txQueue,
    systems,
    txReduced$,
    startSync,
    network,
    actions,
    api: { spawnEntity },
    dev: setupDevSystems(world, encoders, systems),
  };

  return context;
}
