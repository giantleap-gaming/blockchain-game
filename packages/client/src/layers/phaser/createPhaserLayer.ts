import { createEntity, defineComponent, namespaceWorld, setComponent, Type } from "@latticexyz/recs";
import { createPhaserEngine } from "@latticexyz/phaserx";
import { phaserConfig } from "./config";
import { NetworkLayer } from "../network";
import { createMapSystem, createPositionSystem, createSelectSystem, energySystem } from "./systems";


export async function createPhaserLayer(network: NetworkLayer) {
  const world = namespaceWorld(network.world, "phaser");
  const selectAreaEntity = createEntity(world);
  const energyEntity = createEntity(world);
  const components = {
    Selected:
      defineComponent(
        world,
        { x: Type.Number, y: Type.Number, show: Type.Boolean },
        { id: "Selection" }
      ),
    Energy:
      defineComponent(
        world,
        { energy: Type.Number, show: Type.Boolean },
        { id: "Energy-local" }
      ),
  };

  function selectArea(x: number, y: number, show: boolean) {
    setComponent(components.Selected, selectAreaEntity, { x, y, show });
  }

  function setEnergy(energy: number, show: boolean) {
    setComponent(components.Energy, energyEntity, { energy: energy, show });
    let newEnergy = energy;
    if (show) {
      const energyRegeneration = setInterval(() => {
        newEnergy += 1
        if (newEnergy >= 30) {
          clearInterval(energyRegeneration);
          newEnergy = 0
        } else {
          setComponent(components.Energy, energyEntity, { energy: newEnergy, show });
        }
      }, 1000)
    }
  }

  const { game, scenes, dispose: disposePhaser } = await createPhaserEngine(phaserConfig);
  world.registerDisposer(disposePhaser);

  const context = {
    world,
    components,
    network,
    game,
    scenes,
    api: { selectArea, setEnergy }
  };

  createMapSystem(network, context)
  createSelectSystem(network, context)
  createPositionSystem(network, context)
  energySystem(network, context)
  return context;
}
