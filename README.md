# BetterDiscord Types

[Typescript](https://www.typescriptlang.org/) type definitions for [BetterDiscord](https://betterdiscord.app/).

## Usage

```
npm install @types/betterdiscord@github:zerthox/betterdiscord-types
```

**Note:** When installing under a name not starting with `@types`, definitions for globals may not be included.
Importing the module somewhere or using for example [typeRoots](https://www.typescriptlang.org/tsconfig#typeRoots) can fix this.

```ts
import type { Patcher, Filters } from "betterdiscord";
```

## Custom Data Type

A custom type for BetterDiscord's `BdApi.Data` interface may be supplied.
This enables more specific typing for `Data`'s functions.

When used from `BdApi` directly, `Data` needs to be casted:

```ts
import type { Data } from "betterdiscord";

const TypedData = BdApi.Data as Data<CustomDataType>;
```

When using a bound version of `BdApi`, the custom type can be supplied in the constructor:

```ts
const BoundBdApi = new BdApi<CustomDataType>("PluginName");
```
