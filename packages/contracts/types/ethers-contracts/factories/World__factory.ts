/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { World, WorldInterface } from "../World";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "componentId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "component",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "ComponentValueRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "componentId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "component",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "ComponentValueSet",
    type: "event",
  },
  {
    inputs: [],
    name: "components",
    outputs: [
      {
        internalType: "contract IUint256Component",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getComponent",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "componentAddr",
        type: "address",
      },
    ],
    name: "getComponentIdFromAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumEntities",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "systemId",
        type: "uint256",
      },
    ],
    name: "getSystemAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUniqueEntityId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "hasEntity",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "enum QueryType",
            name: "queryType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "componentId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "value",
            type: "bytes",
          },
        ],
        internalType: "struct WorldQueryFragment[]",
        name: "worldQueryFragments",
        type: "tuple[]",
      },
    ],
    name: "query",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "register",
    outputs: [
      {
        internalType: "contract RegisterSystem",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "componentAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "registerComponent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "component",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "registerComponentValueRemoved",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "component",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "registerComponentValueSet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "systemAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "registerSystem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "systems",
    outputs: [
      {
        internalType: "contract IUint256Component",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class World__factory {
  static readonly abi = _abi;
  static createInterface(): WorldInterface {
    return new utils.Interface(_abi) as WorldInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): World {
    return new Contract(address, _abi, signerOrProvider) as World;
  }
}
