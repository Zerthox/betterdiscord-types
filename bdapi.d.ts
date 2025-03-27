import type * as React from "react";
import type * as ReactDOM from "react-dom";

import type { AddonAPI } from "./addonapi.d.ts";
import type { ContextMenu } from "./contextmenu.d.ts";
import type { Data, BoundData } from "./data.d.ts";
import type { DOM, BoundDOM } from "./dom.d.ts";
import type { Net } from "./net.d.ts";
import type { Patcher, BoundPatcher } from "./patcher.d.ts";
import type { ReactUtils } from "./reactutils.d.ts";
import type { UI } from "./ui.d.ts";
import type { Utils } from "./utils.d.ts";
import type { Webpack } from "./webpack.d.ts";
import type { Legacy } from "./legacy.d.ts";
import type { Components } from "./components.d.ts";
import type { Logger, BoundLogger } from "./logger.d.ts";

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
    Plugins: AddonAPI<any>;

    /** Interface to access themes. */
    Themes: AddonAPI<any>;

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
