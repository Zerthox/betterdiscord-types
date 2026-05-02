import * as React from "react";
import * as ReactDOM from "react-dom";

import { AddonAPI } from "./addonapi";
import { BoundCommandAPI, CommandAPI } from "./commands";
import { Components } from "./components";
import { ContextMenu } from "./contextmenu";
import { Data, BoundData } from "./data";
import { DOM, BoundDOM } from "./dom";
import { Logger, BoundLogger } from "./logger";
import { Net } from "./net";
import { Patcher, BoundPatcher } from "./patcher";
import { ReactUtils } from "./reactutils";
import { UI } from "./ui";
import { Utils } from "./utils";
import { Webpack } from "./webpack";
import { BoundHooks, Hooks } from "./hooks";

/** BetterDiscord's global plugin API. */
export interface BdApi {
    /** Returns the global plugin API. */
    new (): BdApi;

    /** Creates a new plugin API instance bound to a specific caller name. */
    new <D extends Record<string, any>>(pluginName: string): BoundBdApi<D>;

    /** Commands API. */
    Commands: CommandAPI;

    /** React Components exposed for plugins. */
    Components: Components;

    /** Utility for patching and creating context menus. */
    ContextMenu: ContextMenu;

    /** Utility for management of plugin data. */
    Data: Data;

    /** Utility for DOM manipulation. */
    DOM: DOM;

    /** Hooks. */
    Hooks: Hooks;

    /** A logger for logging information. */
    Logger: Logger;

    /** Utility for network requests. */
    Net: Net;

    /** Utility for modifying existing functions. */
    Patcher: Patcher;

    /** Interface to access plugins. */
    Plugins: AddonAPI<any>;

    /** The React module being used inside Discord. */
    React: typeof React;

    /** The ReactDOM module being used inside Discord. */
    ReactDOM: typeof ReactDOM;

    /** Utility for interacting with React internals. */
    ReactUtils: ReactUtils;

    /** Interface to access themes. */
    Themes: AddonAPI<any>;

    /** Utility for user interfaces. */
    UI: UI;

    /** Utility for commonly reused functions. */
    Utils: Utils;

    /** BetterDiscord's version as string. */
    version: string;

    /** Utility for getting internal webpack modules. */
    Webpack: Webpack;
}

export interface BoundBdApi<
    D extends Record<string, any> = Record<string, any>,
> extends Omit<
    BdApi,
    "Commands" | "Data" | "DOM" | "Hooks" | "Logger" | "Patcher"
> {
    /** @see {@link BdApi.Commands} */
    Commands: BoundCommandAPI;

    /** @see {@link BdApi.Data} */
    Data: BoundData<D>;

    /** @see {@link BdApi.DOM} */
    DOM: BoundDOM;

    /** @see {@link BdApi.Hooks} */
    Hooks: BoundHooks;

    /** @see {@link BdApi.Logger} */
    Logger: BoundLogger;

    /** @see {@link BdApi.Patcher} */
    Patcher: BoundPatcher;
}
