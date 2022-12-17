import { setCharMovePosition } from './../local/local-api/setCharMovePosition';
import { createEntity, namespaceWorld } from "@latticexyz/recs";
import { createPhaserEngine } from "@latticexyz/phaserx";
import { phaserConfig } from "./config";
import { NetworkLayer } from "../network";
import { airDetails, hover, foodDetails, select, powerDetails, move } from '../local/components'
import { createMapSystem, hoverSystem, selectSystem, powerSystem, airSystem, foodSystem, moveSystem } from '../local/systems';
import { setHoverPosition, setSelectPosition, powerDetailsChange, foodDetailsChange, airDetailsChange, getEntityIdAtPosition, getEntityIndexAtPosition } from '../local/local-api'

export async function createPhaserLayer(network: NetworkLayer) {
  const world = namespaceWorld(network.world, "phaser");

  // defining all the entity's
  const foodDetailsEntityId = createEntity(world)
  const oxygenDetailsEntityId = createEntity(world)
  const powerDetailsEntityId = createEntity(world)
  const selectionEntityId = createEntity(world)
  const hoverEntityId = createEntity(world)
  const char1EntityId = createEntity(world)
  const char2EntityId = createEntity(world)

  //id's of all the components
  const localIds = {
    foodDetailsEntityId,
    selectionEntityId,
    hoverEntityId,
    oxygenDetailsEntityId,
    powerDetailsEntityId,
    char1EntityId,
    char2EntityId
  }
  // defining all the local components
  const localComponents = {
    AirDetails: airDetails(world),
    FoodDetails: foodDetails(world),
    PowerDetails: powerDetails(world),
    Hover: hover(world),
    Select: select(world),
    Move: move(world),
  };
  // defining all the local components api changes
  const localApi = {
    setHoverPosition,
    setSelectPosition,
    airDetailsChange,
    foodDetailsChange,
    powerDetailsChange,
    setCharMovePosition,
    getEntityIdAtPosition,
    getEntityIndexAtPosition
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
  powerSystem(network, context)
  foodSystem(network, context)
  airSystem(network, context)
  moveSystem(network, context)
  return context;
}
