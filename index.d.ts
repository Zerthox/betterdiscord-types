import * as React from "react";
import * as ReactDOM from "react-dom";
import { LoDashStatic } from "lodash";
import * as classNames from "classnames";
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
export interface BdApi extends Legacy {
    /** BetterDiscord's version as string. */
    version: string;

    /** Utility for modifying existing functions. */
    Patcher: Patcher;

    /** Utility for getting internal webpack modules. */
    Webpack: Webpack;

    /** Utility for management of plugin data. */
    Data: Data;

    /** Utility for DOM manipulation. */
    DOM: DOM;

    /** Utility for user interfaces. */
    UI: UI;

    /** Utility for patching and creating context menus. */
    ContextMenu: ContextMenu;

    /** Interface to access plugins. */
    Plugins: AddonAPI<any>;

    /** Interface to access themes. */
    Themes: AddonAPI<any>;

    /** Utility for commonly reused functions. */
    Utils: Utils;

    /** Utility for interacting with React internals. */
    ReactUtils: ReactUtils;

    /** The React module being used inside Discord. */
    React: typeof React;

    /** The ReactDOM module being used inside Discord. */
    ReactDOM: typeof ReactDOM;
}

type AnyFn = (...args: any) => any;

type FnOrAny<F> = F extends AnyFn ? F : any;

export type Cancel = () => void;

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
    ): Cancel;

    /**
     * Patches a function, executing the callback after it was called.
     * This allows modifying the return value from the original.
     */
    after<M, K extends keyof M>(
        caller: string,
        moduleToPatch: M,
        functionName: K,
        callback: PatchAfterCallback<FnOrAny<M[K]>>,
    ): Cancel;

    /**
     * Patches a function, executing the callback instead of the original.
     * This allows completely replacing the original.
     */
    instead<M, K extends keyof M>(
        caller: string,
        moduleToPatch: M,
        functionName: K,
        callback: PatchInsteadCallback<FnOrAny<M[K]>>,
    ): Cancel;

    /** Returns all patches for the given caller. */
    getPatchesByCaller(caller: string): PatchInfo[];

    /** Removes all patches created by the given caller. */
    unpatchAll(caller: string): void;
}

export type PatchBeforeCallback<O extends AnyFn> = (
    thisObject: ThisParameterType<O>,
    methodArguments: Parameters<O>,
) => any;

export type PatchAfterCallback<O extends AnyFn> = (
    thisObject: ThisParameterType<O>,
    methodArguments: Parameters<O>,
    returnValue: ReturnType<O>,
) => any;

export type PatchInsteadCallback<O extends AnyFn> = (
    thisObject: ThisParameterType<O>,
    methodArguments: Parameters<O>,
    originalMethod: O,
) => any;

export interface PatchInfo {
    callback: AnyFn;
    caller: string;
    id: number;
    type: "before" | "after" | "instead";
    unpatch: Cancel;
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
    getModule<F extends boolean>(
        filter: ModuleFilter,
        options?: SearchOptions<F>,
    ): ModuleResult<F>;

    /** Finds multiple modules using multiple filters. */
    getBulk<Q extends ModuleQuery[]>(...queries: Q): ModuleBulkResult<Q>;

    /** Attempts to find a lazy loaded module, resolving when it is loaded. */
    waitForModule(
        filter: ModuleFilter,
        options?: WaitForModuleOptions,
    ): Promise<any>;
}

export interface BaseSearchOptions {
    defaultExport?: boolean;
    searchExports?: boolean;
}

export type ModuleResult<F extends boolean> = F extends false ? any[] : any;

export interface SearchOptions<F extends boolean> extends BaseSearchOptions {
    first?: F;
}

export interface ModuleQuery extends SearchOptions<boolean> {
    filter: ModuleFilter;
}

export type ModuleBulkResult<Q extends ModuleQuery[]> = {
    [I in keyof Q]: ModuleResult<Q[I]["first"]>;
};

export interface WaitForModuleOptions extends BaseSearchOptions {
    signal?: AbortSignal;
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

export interface Data {
    /** Saves JSON-serializable data. */
    save(pluginName: string, key: string, data: any): void;

    /** Loads previously stored data. */
    load(pluginName: string, key: string): any;

    /** Deletes a piece of stored data. This is different than saving as `null` or `undefined`. */
    delete(pluginName: string, key: string): void;
}

export interface DOM {
    /** Current width of the user's screen. */
    get screenHeight(): number;

    /** Current height of the user's screen. */
    get screenWidth(): number;

    /** Adds a `<style>` to the document with the given ID. */
    addStyle(id: string, css: string): void;

    /** Removes a `<style>` from the document corresponding to the given ID. */
    removeStyle(id: string): void;

    /** Adds a listener for when the node is removed from the document body. */
    onRemoved(node: HTMLElement, callback: () => void): Cancel;

    /** Utility to help smoothly animate using JavaScript. */
    animate(
        update: (progress: number) => void,
        duration: number,
        options?: AnimateOptions,
    ): void;

    /**
     * Utility function to make creating DOM elements easier.
     * Acts similarly to `React.createElement`.
     */
    createElement(
        tag: string,
        options?: CreateElementOptions,
        child?: HTMLElement,
    ): HTMLElement;

    /**
     * Parses a string of HTML and returns the results.
     * If the second parameter is `true`, the parsed HTML will be returned as a document fragment.
     * This is extremely useful if you have a list of elements at the top level, they can then be appended all at once to another node.
     *
     * If the second parameter is `false`, then the return value will be the list of parsed nodes
     * and there were multiple top level nodes, otherwise the single node is returned.
     */
    parseHTML<F extends boolean = false>(
        html: string,
        fragment?: F,
    ): F extends true ? DocumentFragment : NodeList | HTMLElement;
}

export interface AnimateOptions {
    timing?: (timeFraction: number) => number;
}

export interface CreateElementOptions {
    id?: string;
    className?: string;
    target?: HTMLElement;
}

export interface UI {
    /** Shows a generic but customizable modal. */
    alert(title: string, content: React.ReactChild): void;

    /** Creates a tooltip to show on hover. */
    createTooltip(
        node: HTMLElement,
        content: string | HTMLElement,
        options?: TooltipOptions,
    ): Tooltip;

    /** Shows a generic but customizable confirmation modal with optional confirm and cancel callbacks. */
    showConfirmationModal(
        title: string,
        content: React.ReactChild,
        options?: ConfirmationModalOptions,
    ): string;

    /** Shows a toast towards the bottom of the screen. */
    showToast(content: string, options?: ToastOptions): void;

    /** Shows a notice above Discord's chat layer. */
    showNotice(content: string | Node, options?: NoticeOptions): CloseNotice;

    /** Opens an Electron dialog. */
    openDialog(options: DialogSaveOptions): Promise<DialogSaveResult>;
    openDialog(options: DialogOpenOptions): Promise<DialogOpenResult>;
}

export interface TooltipOptions {
    style?: "primary" | "info" | "success" | "warn" | "danger";
    side?: "top" | "right" | "bottom" | "left";
    preventFlip?: boolean;
    disabled?: boolean;
}

export type Tooltip = any;

export interface ConfirmationModalOptions {
    danger?: boolean;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export interface NoticeOptions {
    type?: "info" | "error" | "warning" | "success";
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

export interface ContextMenu extends ContextMenuComponents {
    /**
     * Allows you to patch a given context menu.
     * Acts as a wrapper around the `Patcher`.
     */
    patch(navId: string, callback: ContextMenuCallback): Cancel;

    /* Allows you to remove the patch added to a given context menu. */
    unpatch(navId: string, callback: ContextMenuCallback): Cancel;

    /**
     * Builds a single menu item.
     *
     * The only prop shown here is the type, the rest should match the actual component being built.
     * View those to see what options exist for each, they often have less in common than you might think.
     */
    buildItem(props: ContextMenuItemProps): React.ReactElement;

    /**
     * Creates the all the items **and groups** of a context menu recursively.
     *
     * There is no hard limit to the number of groups within groups or number of items in a menu.
     */
    buildMenuChildren(setup: ContextMenuSetup): React.ReactElement;

    /**
     * Creates the menu *component* including the wrapping `ContextMenu`.
     * Calls {@link ContextMenu.buildMenuChildren} under the covers.
     */
    buildMenu(setup: ContextMenuSetup): React.FunctionComponent<any>;

    /** Function that allows you to open an entire context menu. */
    open(
        event: MouseEvent,
        menuComponent: React.ComponentType<any>,
        config: ContextMenuConfig,
    ): any;

    /** Closes the current opened context menu immediately. */
    close(): any;
}

export type ContextMenuCallback = (
    tree: React.ReactElement,
) => React.ReactElement;

export interface ContextMenuItemProps extends Record<string, any> {
    type?:
        | "text"
        | "submenu"
        | "toggle"
        | "radio"
        | "control"
        | "custom"
        | "separator";
}

export interface ContextMenuGroupProps {
    type: "group";
    items: ContextMenuItemProps[];
}

export type ContextMenuSetup = (ContextMenuItemProps | ContextMenuGroupProps)[];

export interface ContextMenuConfig {
    position?: "right" | "left";
    align?: "top" | "bottom";
    onClose?: (...args: any) => void;
    noBlurEvent?: boolean;
}

export interface ContextMenuComponents {
    Menu: React.ComponentType<any>;
    Group: React.ComponentType<any>;
    Item: React.ComponentType<any>;
    Separator: React.ComponentType<any>;
    CheckboxItem: React.ComponentType<any>;
    ControlItem: React.ComponentType<any>;
    RadioItem: React.ComponentType<any>;
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

export interface Utils {
    /** Finds a value, subobject, or array from a tree that matches a specific filter. This is a DFS. */
    findInTree(
        tree: any,
        searchFilter: (node: any) => boolean,
        options?: FindInTreeOptions,
    ): any;

    /**
     * Deep extends an object with a set of other objects.
     * Objects later in the list of `extenders` have priority, that is to say if one sets a key to be a primitive,
     * it will be overwritten with the next one with the same key.
     * If it is an object, and the keys match, the object is extended.
     * This happens recursively.
     */
    extend(extendee: any, ...extenders: any[]): any;

    /**
     * Returns a function, that, as long as it continues to be invoked, will not be triggered.
     * The function will be called after it stops being called for `delay` milliseconds.
     */
    debounce<F extends AnyFn>(executor: F, delay: number): F;

    /** Takes a string of HTML and escapes it using the browser's own escaping mechanism. */
    escapeHTML(html: string): string;

    /**
     * Builds a classname string from any number of arguments.
     * This includes arrays and objects.
     * When given an array all values from the array are added to the list.
     * When given an object they keys are added as the classnames if the value is truthy.
     */
    className: typeof classNames;
}

export interface FindInTreeOptions {
    walkable?: string[] | null;
    ignore?: string[];
}

export interface ReactUtils {
    get rootInstance(): any;

    /** Gets the internal react data of a specified node. */
    getInternalInstance(node: HTMLElement): Fiber | undefined;

    /**
     * Attempts to find the "owner" node to the current node.
     * This is generally a node with an instance of a class component as `stateNode`.
     */
    getOwnerInstance(
        node: HTMLElement,
        options?: GetOwnerInstanceOptions,
    ): React.Component<any, any> | null;

    /** Creates an unrendered react component that wraps dom elements. */
    wrapElement(element: HTMLElement): React.ComponentClass;
}

export interface GetOwnerInstanceOptions {
    include?: string[];
    exclude?: string[];
    filter?: (node: React.Component<any, any>) => boolean;
}

/** @deprecated */
export interface Legacy {
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

    /**
     * Shows a generic but customizable modal.
     * @deprecated Use {@link UI.alert} instead.
     */
    alert(title: string, children: React.ReactChild): void;

    /**
     * Shows a generic but customizable confirmation modal with optional confirm and cancel callbacks.
     * @deprecated Use {@link UI.showConfirmationModal} instead.
     */
    showConfirmationModal(
        title: string,
        content: React.ReactChild,
        options?: ConfirmationModalOptions,
    ): void;

    /**
     * Shows a notice above Discord's chat layer. Returns a callback for closing the notice.
     * @deprecated Use {@link UI.showNotice} instead.
     */
    showNotice(content: string | Node, options?: NoticeOptions): CloseNotice;

    /**
     * Shows a toast towards the bottom of the screen.
     * @deprecated Use {@link UI.showToast} instead.
     */
    showToast(content: string, options?: ToastOptions): void;

    /**
     * Opens an Electron dialog.
     * @deprecated Use {@link UI.openDialog} instead.
     */
    openDialog(options: DialogSaveOptions): Promise<DialogSaveResult>;
    openDialog(options: DialogOpenOptions): Promise<DialogOpenResult>;

    /**
     * Loads previously stored data.
     * @deprecated Use {@link Data.load} instead.
     */
    loadData(pluginName: string, key: string): any;

    /**
     * Saves JSON-serializable data.
     * @deprecated Use {@link Data.save} instead.
     */
    saveData(pluginName: string, key: string, data: any): void;

    /**
     * Deletes a piece of stored data. This is different than saving `null` or `undefined`.
     * @deprecated Use {@link Data.delete} instead.
     */
    deleteData(pluginName: string, key: string): void;

    /**
     * Adds a `<style>` to the document with the given ID.
     * @deprecated Use {@link DOM.addStyle} instead.
     */
    injectCSS(id: string, styles: string): void;

    /**
     * Removes a `<style>` from the document corresponding to the given ID.
     * @deprecated Use {@link DOM.removeStyle} instead.
     */
    clearCSS(id: string): void;

    /**
     * Adds a listener for when the node is removed from the document body.
     * @deprecated Use {@link DOM.onRemoved} instead.
     */
    onRemoved(node: HTMLElement, callback: () => void): void;

    /**
     * Returns the internal React data (fiber) of a specific node.
     * @deprecated Use {@link ReactUtils.getInternalInstance} instead.
     */
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
    ): Cancel;

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
