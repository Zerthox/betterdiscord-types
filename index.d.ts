import * as React from "react";
import * as ReactDOM from "react-dom";
import { LoDashStatic } from "lodash";
import { FileFilter } from "electron";
import { Fiber } from "react-reconciler";

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
export interface BdApi {
    /** BetterDiscord's version as string. */
    version: string;

    /** A utility for modifying existing functions. */
    Patcher: Patcher;

    /** A utility for getting internal webpack modules. */
    Webpack: Webpack;

    /** An interface to access plugins. */
    Plugins: AddonAPI<any>;

    /** An interface to access themes. */
    Themes: AddonAPI<any>;

    /** The React module being used inside Discord. */
    React: typeof React;

    /** The ReactDOM module being used inside Discord. */
    ReactDOM: typeof ReactDOM;

    /**
     * BetterDiscord's emotes.
     * @deprecated
     */
    emotes: any;

    /**
     * BetterDiscord's settings.
     * @deprecated
     */
    settings: any;

    /** Shows a generic but customizable modal. */
    alert(
        title: string,
        children: string | JSX.Element | string[] | JSX.Element[],
    ): void;

    /** Shows a generic but customizable confirmation modal with optional confirm and cancel callbacks. */
    showConfirmationModal(
        title: string,
        content: string | JSX.Element,
        options?: ConfirmationModalOptions,
    ): void;

    /** Shows a notice above Discord's chat layer. Returns a callback for closing the notice. */
    showNotice(content: string | Node, options: NoticeOptions): CloseNotice;

    /** Shows a toast towards the bottom of the screen. */
    showToast(content: string, options?: ToastOptions): void;

    /** Opens an Electron dialog. */
    openDialog(options: DialogSaveOptions): Promise<DialogSaveResult>;
    openDialog(options: DialogOpenOptions): Promise<DialogOpenResult>;

    /** Loads previously stored data. */
    loadData(pluginName: string, key: string): any;

    /** Saves JSON-serializable data. */
    saveData(pluginName: string, key: string, data: any): void;

    /** Deletes a piece of stored data. This is different than saving `null` or `undefined`. */
    deleteData(pluginName: string, key: string): void;

    /** Adds a `<style>` to the document with the given ID. */
    injectCSS(id: string, styles: string): void;

    /** Removes a `<style>` from the document corresponding to the given ID. */
    clearCSS(id: string): void;

    /** Adds a listener for when the node is removed from the document body. */
    onRemoved(node: HTMLElement, callback: () => void): void;

    /** Returns the internal React data (fiber) of a specific node. */
    getInternalInstance(node: HTMLElement): Fiber | undefined;

    /**
     * Returns whether a specific BetterDiscord settings is currently enabled.
     * @deprecated
     */
    isSettingEnabled(collection: string, category: string, id: string): boolean;
    isSettingEnabled(category: string, id: string): boolean;

    /**
     * Enables a BetterDiscord setting by ID.
     * @deprecated
     */
    enableSetting(collection: string, category: string, id: string): void;
    enableSetting(category: string, id: string): void;

    /**
     * Disables a BetterDiscord setting by ID.
     * @deprecated
     */
    enableSetting(collection: string, category: string, id: string): void;
    enableSetting(category: string, id: string): void;

    /**
     * Toggles a BetterDiscord setting by ID.
     * @deprecated
     */
    toggleSetting(collection: string, category: string, id: string): void;
    toggleSetting(category: string, id: string): void;

    /**
     * Gets some data in BetterDiscord's misc data.
     * @deprecated
     */
    getBDData(key: string): any;

    /**
     * Sets some data in BetterDiscord's misc data.
     * @deprecated
     */
    setBDData(key: string, data: any): void;

    /**
     * Creates and links a remote JS script.
     * @deprecated Using remote scripts is highly discouraged.
     */
    linkJS(id: string, url: string): Promise<void>;

    /**
     * Removes a remotely linked JS script.
     * @deprecated Using remote scripts is highly discouraged.
     */
    unlinkJS(id: string): void;

    /**
     * Monkey-patches a method on an object.
     * The patching callback may be run before, after or instead of target method.
     * @deprecated Use {@link BdApi.Patcher} instead.
     */
    monkeyPatch<M>(
        what: M,
        methodName: keyof M,
        options: MonkeyPatchOptions,
    ): CancelPatch;

    /**
     * Finds a webpack module matching the filter.
     * @deprecated Use {@link BdApi.Webpack} instead.
     */
    findModule(filter: ModuleFilter): any | undefined;

    /**
     * Finds all webpack modules matching the filter.
     * @deprecated Use {@link BdApi.Webpack} instead.
     */
    findAllModules(filter: ModuleFilter): any[];

    /**
     * Finds a webpack module by its `displayName` property.
     * @deprecated Use {@link BdApi.Webpack} instead.
     */
    findModuleByDisplayName(name: string): any | undefined;

    /**
     * Finds a webpack module by its property names.
     * @deprecated Use {@link BdApi.Webpack} instead.
     */
    findModuleByProps(...props: string[]): any | undefined;

    /**
     * Finds a webpack module by properties of its prototype.
     * @deprecated Use {@link BdApi.Webpack} instead.
     */
    findModuleByPrototypes(...protos: string[]): any | undefined;

    /**
     * Wraps a given function in a `try..catch` block.
     * @deprecated
     */
    suppressErrors<F extends AnyFn>(method: F, message: string): F;

    /**
     * Tests a given object to determine if it is valid JSON.
     * @deprecated
     */
    testJSON(data: any): boolean;
}

type AnyFn = (...args: any) => any;

type FnOrAny<F> = F extends AnyFn ? F : any;

export interface Patcher {
    /**
     * Patches a function, executing the callback before it was called.
     * This allows modifying the arguments being passed to the original.
     */
    before<M, K extends keyof M>(
        caller: string,
        moduleToPatch: M,
        functionName: K,
        callback: PatchBeforeCallback<FnOrAny<M[K]>>,
    ): CancelPatch;

    /**
     * Patches a function, executing the callback after it was called.
     * This allows modifying the return value from the original.
     */
    after<M, K extends keyof M>(
        caller: string,
        moduleToPatch: M,
        functionName: K,
        callback: PatchAfterCallback<FnOrAny<M[K]>>,
    ): CancelPatch;

    /**
     * Patches a function, executing the callback instead of the original.
     * This allows completely replacing the original.
     */
    instead<M, K extends keyof M>(
        caller: string,
        moduleToPatch: M,
        functionName: K,
        callback: PatchInsteadCallback<FnOrAny<M[K]>>,
    ): CancelPatch;

    /** Returns all patches for the given caller. */
    getPatchesByCaller(caller: string): PatchInfo[];

    /** Removes all patches created by the given caller. */
    unpatchAll(caller: string): void;
}

export type PatchBeforeCallback<O extends AnyFn> = (
    thisObject: any,
    methodArguments: Parameters<O>,
) => any;

export type PatchAfterCallback<O extends AnyFn> = (
    thisObject: any,
    methodArguments: Parameters<O>,
    returnValue: ReturnType<O>,
) => any;

export type PatchInsteadCallback<O extends AnyFn> = (
    thisObject: any,
    methodArguments: Parameters<O>,
    originalMethod: O,
) => any;

export type CancelPatch = () => void;

export interface PatchInfo {
    callback: AnyFn;
    caller: string;
    id: number;
    type: "before" | "after" | "instead";
    unpatch: CancelPatch;
}

export type ModuleFilter = (
    exports: any,
    module: {
        id: number;
        loaded: true;
        exports: any;
    },
    id: string,
) => boolean;

export interface Webpack {
    /** A variety of filters useful for finding webpack modules. */
    Filters: Filters;

    /** Finds a module using a filter function. */
    getModule(filter: ModuleFilter, options?: FilterOptions): any;

    /** Finds multiple modules using multiple filters. */
    getBulk<Q extends ModuleQuery[]>(...queries: Q): ModuleBulk<Q>;

    /** Attempts to find a lazy loaded module, resolving when it is loaded. */
    waitForModule(
        filter: ModuleFilter,
        options?: WaitForModuleOptions,
    ): Promise<any>;
}

export interface ModuleQuery {
    filter: ModuleFilter;
    first?: boolean;
    defaultExport?: boolean;
}

export type ModuleBulk<Q extends ModuleQuery[]> = {
    [I in keyof Q]: Q[I]["first"] extends false ? any[] : any;
};

export interface WaitForModuleOptions {
    signal?: AbortSignal;
    defaultExport?: boolean;
}

export interface Filters {
    /** Generates a filter checking for a given `displayName`. */
    byDisplayName(name: string): ModuleFilter;

    /** Generates a filter checking for a given set of property names. */
    byProps(...props: string[]): ModuleFilter;

    /** Generates a filter checking for a given set of properties on the prototype. */
    byPrototypeFields(...prototypes: string[]): ModuleFilter;

    /** Generates a filter matching against a given regex. */
    byRegex(regex: RegExp): ModuleFilter;

    /** Generates a filter checking for given strings. */
    byStrings(...strings: string[]): ModuleFilter;

    /** Generates a combined filter from multiple filters. */
    combine(...filters: ModuleFilter[]): ModuleFilter;
}

export interface FilterOptions {
    first?: boolean;
    defaultExport?: boolean;
}

export interface AddonAPI<T> {
    folder: string;
    get(idOrFile: string): T;
    getAll(): T[];
    enable(idOrFile: string): void;
    disable(idOrFile: string): void;
    isEnabled(idOrFile: string): boolean;
    reload(idOrFile: string): void;
    toggle(idOrFile: string): void;
}

export interface ConfirmationModalOptions {
    danger?: boolean;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export interface NoticeOptions {
    type?: string;
    buttons?: { label: string; onClick: () => void }[];
    timeout?: number;
}

export type CloseNotice = (immediately?: boolean) => void;

export interface ToastOptions {
    type?: "" | "info" | "success" | "danger" | "error" | "warning" | "warn";
    icon?: boolean;
    timeout?: number;
    forceShow?: boolean;
}

export interface DialogOptions {
    mode?: "open" | "save";
    defaultPath?: string;
    filters?: FileFilter[];
    title?: string;
    message?: string;
    showOverwriteConfirmation?: boolean;
    showHiddenFiles?: boolean;
    promptToCreate?: boolean;
    openDirectory?: boolean;
    openFile?: boolean;
    multiSelections?: boolean;
    modal?: boolean;
}

export interface DialogOpenOptions extends DialogOptions {
    mode?: "open";
}

export interface DialogSaveOptions extends DialogOptions {
    mode: "save";
}

export interface DialogResult {
    cancelled: boolean;
    filePath?: string;
    filePaths?: string[];
}

export interface DialogOpenResult extends Omit<DialogResult, "filePaths"> {
    filePath: string;
}

export interface DialogSaveResult extends Omit<DialogResult, "filePath"> {
    filePaths: string[];
}

/** @deprecated */
export interface MonkeyPatchOptions {
    after?: (data: MonkeyPatchData) => any;
    before?: (data: MonkeyPatchData) => any;
    instead?: (data: MonkeyPatchData) => any;
    once?: boolean;
    silent?: boolean;
}

/** @deprecated */
export interface MonkeyPatchData {
    thisObject: any;
    methodArguments: IArguments;
    returnValue: any;
}
