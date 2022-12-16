import {
  defineSceneConfig,
  AssetType,
  defineScaleConfig,
  defineMapConfig,
  defineCameraConfig,
} from "@latticexyz/phaserx";
import { Sprites, Assets, Maps, Scenes, TILE_HEIGHT, TILE_WIDTH } from "./constants";
import {
  Tileset as OverworldTileset,
  TileAnimations as OverworldTileAnimations,
} from "../phaser/assets/tilesets/overworldTileset";
import overworldTileset from "./assets/tilesets/overworld-tileset.png";
import mountainTileset from "./assets/tilesets/mountain-tileset.png";
const ANIMATION_INTERVAL = 200;
export const phaserConfig = {
  sceneConfig: {
    [Scenes.Main]: defineSceneConfig({
      assets: {
        [Assets.OverworldTileset]: { type: AssetType.Image, key: Assets.OverworldTileset, path: overworldTileset },
        [Assets.MountainTileset]: { type: AssetType.Image, key: Assets.MountainTileset, path: mountainTileset },
        [Assets.MainAtlas]: {
          type: AssetType.MultiAtlas,
          key: Assets.MainAtlas,
          path: "/atlases/sprites/atlas.json",
          options: {
            imagePath: "/atlases/sprites/",
          },
        },
        [Assets.Box]: {
          type: AssetType.Image,
          key: Assets.Box,
          path: "/atlases/sprites/box.png",
        },
        [Assets.Select]: {
          type: AssetType.Image,
          key: Assets.Select,
          path: "/atlases/sprites/select.png",
        },
        [Assets.Hover]: {
          type: AssetType.Image,
          key: Assets.Hover,
          path: "/atlases/sprites/hover.png",
        },
        [Assets.X]: {
          type: AssetType.Image,
          key: Assets.X,
          path: "/atlases/sprites/x.png",
        },
        [Assets.O]: {
          type: AssetType.Image,
          key: Assets.O,
          path: "/atlases/sprites/o.png",
        }
      },
      maps: {
        [Maps.Main]: defineMapConfig({
          chunkSize: TILE_WIDTH * 32, // tile size * tile amount
          tileWidth: TILE_WIDTH,
          tileHeight: TILE_HEIGHT,
          backgroundTile: [OverworldTileset.Grass],
          animationInterval: ANIMATION_INTERVAL,
          tileAnimations: OverworldTileAnimations,
          layers: {
            layers: {
              Background: { tilesets: ["Default"], hasHueTintShader: true },
              Foreground: { tilesets: ["Default"], hasHueTintShader: true },
            },
            defaultLayer: "Background",
          },
        }),
      },
      sprites: {
        [Sprites.Settlement]: {
          assetKey: Assets.MainAtlas,
          frame: "sprites/resources/crystal.png",
        },
        [Sprites.Gold]: {
          assetKey: Assets.MainAtlas,
          frame: "sprites/resources/gold.png",
        },
        [Sprites.GoldShrine]: {
          assetKey: Assets.MainAtlas,
          frame: "sprites/resources/gold.png",
        },
        [Sprites.EscapePortal]: {
          assetKey: Assets.MainAtlas,
          frame: "sprites/resources/wood.png",
        },
        [Sprites.EmberCrown]: {
          assetKey: Assets.MainAtlas,
          frame: "sprites/resources/wood.png",
        },
        [Sprites.Donkey]: {
          assetKey: Assets.MainAtlas,
          frame: "sprites/workers/donkey.png",
        },
      },
      animations: [],
      tilesets: {
        Default: { assetKey: Assets.OverworldTileset, tileWidth: TILE_WIDTH, tileHeight: TILE_HEIGHT },
      },
    }),
  },
  scale: defineScaleConfig({
    parent: "phaser-game",
    zoom: 2,
    mode: Phaser.Scale.NONE,
  }),
  cameraConfig: defineCameraConfig({
    phaserSelector: "phaser-game",
    pinchSpeed: 1,
    wheelSpeed: 1,
    maxZoom: 4,
    minZoom: 1,
  }),
  cullingChunkSize: TILE_HEIGHT * 16,
};
