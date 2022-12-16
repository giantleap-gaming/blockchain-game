import { createEntity, namespaceWorld } from "@latticexyz/recs";
import { createPhaserEngine } from "@latticexyz/phaserx";
import { phaserConfig } from "./config";
import { NetworkLayer } from "../network";
import { airDetails, hover, oxygenDetails, select, waterDetails } from '../local/components'
import { createMapSystem, hoverSystem, selectSystem } from '../local/systems';
import { setHoverPosition, setSelectPosition } from '../local/local-api'

export async function createPhaserLayer(network: NetworkLayer) {
  const world = namespaceWorld(network.world, "phaser");

  // defining all the entity's
  const airDetailsEntityId = createEntity(world)
  const selectionEntityId = createEntity(world)
  const hoverEntityId = createEntity(world)
  const oxygenDetailsEntityId = createEntity(world)
  const waterDetailsEntityId = createEntity(world)

  //id's of all the components
  const localIds = {
    airDetailsEntityId,
    selectionEntityId,
    hoverEntityId,
    oxygenDetailsEntityId,
    waterDetailsEntityId,
  }

  // defining all the local components
  const localComponents = {
    AirDetails: airDetails(world),
    Hover: hover(world),
    OxygenDetails: oxygenDetails(world),
    Select: select(world),
    WaterDetails: waterDetails(world),
  };

  // defining all the local components api changes
  const localApi = {
    setHoverPosition,
    setSelectPosition
  }

  const { game, scenes, dispose: disposePhaser } = await createPhaserEngine(phaserConfig);
  world.registerDisposer(disposePhaser);

  const context = {
    world,
    localComponents,
    network,
    game,
    scenes,
    localApi,
    localIds
  };

  createMapSystem(network, context)
  hoverSystem(network, context)
  selectSystem(network, context)

  return context;
}
