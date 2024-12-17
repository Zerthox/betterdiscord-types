import * as React from "react";
import * as ReactDOM from "react-dom";

import { Plugins, Themes } from "./addonapi";
import { ContextMenu } from "./contextmenu";
import { Data, BoundData } from "./data";
import { DOM, BoundDOM } from "./dom";
import { Net } from "./net";
import { Patcher, BoundPatcher } from "./patcher";
import { ReactUtils } from "./reactutils";
import { UI } from "./ui";
import { Utils } from "./utils";
import { Webpack } from "./webpack";
import { Legacy } from "./legacy";
import { Components } from "./components";
import { Logger, BoundLogger } from "./logger";

/** BetterDiscord's global plugin API. */
export interface BdApi extends Legacy {
    /** Returns the global plugin API. */
    new (): BdApi;

    /** Creates a new plugin API instance bound to a specific caller name. */
    new <D extends Record<string, any>>(pluginName: string): BoundBdApi<D>;

    /** BetterDiscord's version as string. */
    version: string;

    /** The React module being used inside Discord. */
    React: typeof React;

    /** The ReactDOM module being used inside Discord. */
    ReactDOM: typeof ReactDOM;

    /** Interface to access plugins. */
    Plugins: Plugins;

    /** Interface to access themes. */
    Themes: Themes;

    /** Utility for patching and creating context menus. */
    ContextMenu: ContextMenu;

    /** Utility for management of plugin data. */
    Data: Data;

    /** Utility for DOM manipulation. */
    DOM: DOM;

    /** Utility for network requests. */
    Net: Net;

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

    /** React Components exposed for plugins. */
    Components: Components;

    /** A logger for logging information. */
    Logger: Logger;
}

export interface BoundBdApi<D extends Record<string, any> = Record<string, any>>
    extends Omit<BdApi, "Data" | "DOM" | "Patcher" | "Logger"> {
    /** @see {@link BdApi.Data} */
    Data: BoundData<D>;

    /** @see {@link BdApi.DOM} */
    DOM: BoundDOM;

    /** @see {@link BdApi.Patcher} */
    Patcher: BoundPatcher;

    /** @see {@link BdApi.Logger} */
    Logger: BoundLogger;
}
