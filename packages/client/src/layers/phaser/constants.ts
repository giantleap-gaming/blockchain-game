export const TILE_WIDTH = 16;
export const TILE_HEIGHT = 16;

export enum Scenes {
  Main = "Main",
}

export enum Maps {
  Main = "Main",
  Pixel = "Pixel",
  Tactic = "Tactic",
  Strategic = "Strategic",
}

export enum Assets {
  OverworldTileset = "OverworldTileset",
  MountainTileset = "MountainTileset",
  MainAtlas = "MainAtlas",
  Box = 'box',
  X = 'x',
  O = 'o',
  Select = "select",
  Hover = "hover",
  air = "air",
  power = "power",
  food = "food",
  Body = "body",
  thruster = "thruster",
  Char = "Char"
}

export enum Sprites {
  Hero,
  Settlement,
  Gold,
  Inventory,
  GoldShrine,
  EmberCrown,
  EscapePortal,
  Donkey,
  SelectUI,
}

export enum Animations { }

export const UnitTypeSprites: Record<number, Sprites> = {};

export const ItemTypeSprites: Record<number, Sprites> = {};

export const StructureTypeSprites: Record<number, Sprites> = {};
