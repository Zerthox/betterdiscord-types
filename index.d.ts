import * as React from "react";
import * as ReactDOM from "react-dom";
import { LoDashStatic } from "lodash";

import { AddonAPI } from "./addonapi";
import { ContextMenu } from "./contextmenu";
import { Data } from "./data";
import { DOM } from "./dom";
import { Patcher } from "./patcher";
import { ReactUtils } from "./reactutils";
import { UI } from "./ui";
import { Utils } from "./utils";
import { Webpack } from "./webpack";
import { Legacy } from "./legacy";

export * from "./addonapi";
export * from "./contextmenu";
export * from "./data";
export * from "./dom";
export * from "./patcher";
export * from "./reactutils";
export * from "./ui";
export * from "./utils";
export * from "./webpack";
export * from "./legacy";

export type Cancel = () => void;

declare global {
    /** BetterDiscord's global plugin API. */
    const BdApi: BdApi;

    const _: LoDashStatic;

    interface Window {
        /** BetterDiscord's global plugin API. */
        BdApi: BdApi;

        _: LoDashStatic;
    }
}

/** Interface for BetterDiscord plugins. */
export interface Plugin {
    start(): void;
    stop(): void;

    /** Contents of the plugin's settings panel. */
    getSettingsPanel?(): HTMLElement | JSX.Element;

    /**
     * Called on every mutation of the {@link document}.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observer
     */
    observer?(event: MutationRecord): void;

    /**
     * Called every time the view is "switched",
     * for example when the user changes navigates to a different channel or server.
     */
    onSwitch?(): void;

    /** @deprecated Initialize in module scope, in the constructor or on start instead. */
    load?(): void;

    /** @deprecated Use meta instead. */
    getName?(): string;

    /** @deprecated Use meta instead. */
    getAuthor?(): string;

    /** @deprecated Use meta instead. */
    getVersion?(): string;

    /** @deprecated Use meta instead. */
    getDescription?(): string;
}

/** A class constructing a BetterDiscord plugin. */
export interface PluginClass {
    new (meta: Meta): Plugin;
}

/** A function callback constructing a BetterDiscord plugin. */
export type PluginCallback = (meta: Meta) => Plugin;

/** Meta information about a BetterDiscord plugin. */
export interface Meta {
    name: string;
    author: string;
    description: string;
    version: string;
    invite?: string;
    authorId?: string;
    authorLink?: string;
    donate?: string;
    patreon?: string;
    website?: string;
    source?: string;
}

/** BetterDiscord's global plugin API. */
export interface BdApi extends Legacy {
    new (): BdApi;
    new (pluginName: string): BoundBdApi;

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

type Bound<
    T extends Record<B, (name: string, ...args: any) => any>,
    B extends keyof T,
> = {
    [K in keyof T]: K extends B
        ? T[K] extends (name: string, ...args: infer P) => infer R
            ? (...args: P) => R
            : never
        : T[K];
};

export interface BoundBdApi extends Omit<BdApi, "Data" | "DOM" | "Patcher"> {
    Data: Bound<Data, keyof Data>;
    DOM: Bound<DOM, "addStyle" | "removeStyle">;
    Patcher: Bound<Patcher, keyof Patcher>;
}
