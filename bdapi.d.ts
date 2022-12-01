import * as React from "react";
import * as ReactDOM from "react-dom";

import { AddonAPI } from "./addonapi";
import { ContextMenu } from "./contextmenu";
import { Data, BoundData } from "./data";
import { DOM, BoundDOM } from "./dom";
import { Patcher, BoundPatcher } from "./patcher";
import { ReactUtils } from "./reactutils";
import { UI } from "./ui";
import { Utils } from "./utils";
import { Webpack } from "./webpack";
import { Legacy } from "./legacy";

/** BetterDiscord's global plugin API. */
export interface BdApi extends Legacy {
    new (): BdApi;
    new <D extends Record<string, any>>(pluginName: string): BoundBdApi<D>;

    /** BetterDiscord's version as string. */
    version: string;

    /** The React module being used inside Discord. */
    React: typeof React;

    /** The ReactDOM module being used inside Discord. */
    ReactDOM: typeof ReactDOM;

    /** Interface to access plugins. */
    Plugins: AddonAPI<any>;

    /** Interface to access themes. */
    Themes: AddonAPI<any>;

    /** Utility for patching and creating context menus. */
    ContextMenu: ContextMenu;

    /** Utility for management of plugin data. */
    Data: Data;

    /** Utility for DOM manipulation. */
    DOM: DOM;

    /** Utility for modifying existing functions. */
    Patcher: Patcher;

    /** Utility for interacting with React internals. */
    ReactUtils: ReactUtils;

    /** Utility for user interfaces. */
    UI: UI;

    /** Utility for commonly reused functions. */
    Utils: Utils;

    /** Utility for getting internal webpack modules. */
    Webpack: Webpack;
}

type OmitCaller<F> = F extends (caller: string, ...args: infer P) => infer R
    ? (...args: P) => R
    : never;

export type Bound<
    T extends Record<B, (caller: string, ...args: any) => any>,
    B extends keyof T,
> = {
    [K in keyof T]: K extends B ? OmitCaller<T[K]> : T[K];
};

export interface BoundBdApi extends Omit<BdApi, "Data" | "DOM" | "Patcher"> {
    /** @see {@link BdApi.Data} */
    Data: BoundData;

    /** @see {@link BdApi.DOM} */
    DOM: BoundDOM;

    /** @see {@link BdApi.Patcher} */
    Patcher: BoundPatcher;
}
