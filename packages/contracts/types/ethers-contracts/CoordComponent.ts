/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type CoordStruct = { x: BigNumberish; y: BigNumberish };

export type CoordStructOutput = [number, number] & { x: number; y: number };

export interface CoordComponentInterface extends utils.Interface {
  contractName: "CoordComponent";
  functions: {
    "authorizeWriter(address)": FunctionFragment;
    "getEntities()": FunctionFragment;
    "getEntitiesWithValue(bytes)": FunctionFragment;
    "getRawValue(uint256)": FunctionFragment;
    "getSchema()": FunctionFragment;
    "getValue(uint256)": FunctionFragment;
    "has(uint256)": FunctionFragment;
    "id()": FunctionFragment;
    "owner()": FunctionFragment;
    "registerIndexer(address)": FunctionFragment;
    "registerWorld(address)": FunctionFragment;
    "remove(uint256)": FunctionFragment;
    "set(uint256,bytes)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "world()": FunctionFragment;
    "writeAccess(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "authorizeWriter",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getEntities",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEntitiesWithValue",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRawValue",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getSchema", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getValue",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "has", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "id", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerIndexer",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "registerWorld",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "remove",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "set",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "world", values?: undefined): string;
  encodeFunctionData(functionFragment: "writeAccess", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "authorizeWriter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEntities",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEntitiesWithValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRawValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getSchema", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getValue", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "has", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "id", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerIndexer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerWorld",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "remove", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "world", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "writeAccess",
    data: BytesLike
  ): Result;

  events: {};
}

export interface CoordComponent extends BaseContract {
  contractName: "CoordComponent";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CoordComponentInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    authorizeWriter(
      writer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getEntities(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    "getEntitiesWithValue(bytes)"(
      value: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    "getEntitiesWithValue((int32,int32))"(
      coord: CoordStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getRawValue(
      entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getSchema(
      overrides?: CallOverrides
    ): Promise<[string[], number[]] & { keys: string[]; values: number[] }>;

    getValue(
      entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[CoordStructOutput]>;

    has(entity: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;

    id(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    registerIndexer(
      indexer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    registerWorld(
      _world: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    remove(
      entity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "set(uint256,bytes)"(
      entity: BigNumberish,
      value: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "set(uint256,(int32,int32))"(
      entity: BigNumberish,
      value: CoordStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    world(overrides?: CallOverrides): Promise<[string]>;

    writeAccess(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;
  };

  authorizeWriter(
    writer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getEntities(overrides?: CallOverrides): Promise<BigNumber[]>;

  "getEntitiesWithValue(bytes)"(
    value: BytesLike,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "getEntitiesWithValue((int32,int32))"(
    coord: CoordStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getRawValue(entity: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getSchema(
    overrides?: CallOverrides
  ): Promise<[string[], number[]] & { keys: string[]; values: number[] }>;

  getValue(
    entity: BigNumberish,
    overrides?: CallOverrides
  ): Promise<CoordStructOutput>;

  has(entity: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  id(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  registerIndexer(
    indexer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  registerWorld(
    _world: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  remove(
    entity: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "set(uint256,bytes)"(
    entity: BigNumberish,
    value: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "set(uint256,(int32,int32))"(
    entity: BigNumberish,
    value: CoordStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  world(overrides?: CallOverrides): Promise<string>;

  writeAccess(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    authorizeWriter(writer: string, overrides?: CallOverrides): Promise<void>;

    getEntities(overrides?: CallOverrides): Promise<BigNumber[]>;

    "getEntitiesWithValue(bytes)"(
      value: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "getEntitiesWithValue((int32,int32))"(
      coord: CoordStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getRawValue(
      entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getSchema(
      overrides?: CallOverrides
    ): Promise<[string[], number[]] & { keys: string[]; values: number[] }>;

    getValue(
      entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<CoordStructOutput>;

    has(entity: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    id(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    registerIndexer(indexer: string, overrides?: CallOverrides): Promise<void>;

    registerWorld(_world: string, overrides?: CallOverrides): Promise<void>;

    remove(entity: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "set(uint256,bytes)"(
      entity: BigNumberish,
      value: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "set(uint256,(int32,int32))"(
      entity: BigNumberish,
      value: CoordStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    world(overrides?: CallOverrides): Promise<string>;

    writeAccess(arg0: string, overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    authorizeWriter(
      writer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getEntities(overrides?: CallOverrides): Promise<BigNumber>;

    "getEntitiesWithValue(bytes)"(
      value: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getEntitiesWithValue((int32,int32))"(
      coord: CoordStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRawValue(
      entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSchema(overrides?: CallOverrides): Promise<BigNumber>;

    getValue(
      entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    has(entity: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    id(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    registerIndexer(
      indexer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    registerWorld(
      _world: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    remove(
      entity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "set(uint256,bytes)"(
      entity: BigNumberish,
      value: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "set(uint256,(int32,int32))"(
      entity: BigNumberish,
      value: CoordStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    world(overrides?: CallOverrides): Promise<BigNumber>;

    writeAccess(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    authorizeWriter(
      writer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getEntities(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getEntitiesWithValue(bytes)"(
      value: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getEntitiesWithValue((int32,int32))"(
      coord: CoordStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRawValue(
      entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSchema(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getValue(
      entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    has(
      entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    id(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    registerIndexer(
      indexer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    registerWorld(
      _world: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    remove(
      entity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "set(uint256,bytes)"(
      entity: BigNumberish,
      value: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "set(uint256,(int32,int32))"(
      entity: BigNumberish,
      value: CoordStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    world(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    writeAccess(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
