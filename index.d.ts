import * as React from "react";
import * as ReactDOM from "react-dom";
import * as lodash from "lodash";
import { FileFilter } from "electron";
import { Fiber } from "react-reconciler";

declare global {
    const BdApi: BdApi;
    const _: typeof lodash;

    interface Window {
        BdApi: BdApi;
        _: typeof lodash;
    }
}

export interface Plugin {
    start(): void;
    stop(): void;
    load?(): void;
    getSettingsPanel?(): JSX.Element;
    observer?(event: MutationRecord): void;
    onSwitch?(): void;
}

export interface PluginClass {
    new (meta: Meta): Plugin;
}

export interface PluginCallback {
    (meta: Meta): Plugin;
}

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

export interface BdApi {
    version: string;

    Patcher: Patcher;
    Webpack: Webpack;
    Plugins: AddonAPI<any>;
    Themes: AddonAPI<any>;
    React: typeof React;
    ReactDOM: typeof ReactDOM;

    findModule(filter: ModuleFilter): any;
    findAllModules(filter: ModuleFilter): any[];
    findModuleByProps(...props: string[]): any;
    findModuleByPrototypes(...protos: string[]): any;
    findModuleByDisplayName(name: string): any;

    alert(
        title: string,
        children: string | JSX.Element | string[] | JSX.Element[],
    ): void;
    showConfirmationModal(
        title: string,
        content: string | JSX.Element,
        options?: ConfirmationModalOptions,
    ): void;
    showNotice(content: string | Node, options: NoticeOptions): any;
    openDialog(options: DialogOpenOptions): Promise<DialogOpenResult>;
    openDialog(options: DialogSaveOptions): Promise<DialogSaveResult>;
    showToast(content: string, options?: ToastOptions): void;

    loadData(pluginName: string, key: string): any;
    saveData(pluginName: string, key: string, data: any): void;
    deleteData(pluginName: string, key: string): void;

    injectCSS(id: string, styles: string): void;
    clearCSS(id: string): void;

    onRemoved(node: HTMLElement, callback: () => void): void;
    getInternalInstance(node: HTMLElement): Fiber | undefined;
}

export type CancelPatch = () => void;

type AnyFn = (...args: any) => any;

export type PatchCallback<O extends AnyFn> = (
    thisObject: any,
    methodArguments: Parameters<O>,
    returnValue: ReturnType<O>,
) => any;

export interface Patcher {
    before<M extends Record<K, AnyFn>, K extends keyof M>(
        caller: string,
        moduleToPatch: M,
        functionName: K,
        callback: PatchCallback<M[K]>,
    ): CancelPatch;
    after<M extends Record<K, AnyFn>, K extends keyof M>(
        caller: string,
        moduleToPatch: M,
        functionName: K,
        callback: PatchCallback<M[K]>,
    ): CancelPatch;
    instead<M extends Record<K, AnyFn>, K extends keyof M>(
        caller: string,
        moduleToPatch: M,
        functionName: K,
        callback: PatchCallback<M[K]>,
    ): CancelPatch;
    getPatchesByCaller(caller: string): PatchInfo[];
    unpatchAll(caller: string): void;
}

export interface PatchInfo {
    callback: PatchCallback<any>;
    caller: string;
    id: number;
    type: "before" | "after" | "instead";
    unpatch: CancelPatch;
}

export type ModuleFilter = (exports: any, module: any, id: any) => boolean;

export interface Webpack {
    Filters: Filters;
    getModule(filter: ModuleFilter, options?: FilterOptions): any;
    getBulk(...queries: ModuleQuery[]): any[];
    waitForModule(filter: ModuleFilter, options?: WaitForModuleOptions): any;
}

export interface Filters {
    byDisplayName(name: string): ModuleFilter;
    byProps(...props: string[]): ModuleFilter;
    byPrototypeFields(...prototypes: string[]): ModuleFilter;
    byRegex(regex: RegExp): ModuleFilter;
    byStrings(...strings: string[]): ModuleFilter;
    combine(...filters: ModuleFilter[]): ModuleFilter;
}

export interface FilterOptions {
    first?: boolean;
    defaultExport?: boolean;
}

export interface ModuleQuery {
    filter: ModuleFilter;
    first?: boolean;
    defaultExport?: boolean;
}

export interface WaitForModuleOptions {
    signal?: AbortSignal;
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

export interface ToastOptions {
    type?: "" | "info" | "success" | "danger" | "error" | "warning" | "warn";
    icon?: boolean;
    timeout?: number;
    forceShow?: boolean;
}

export interface DialogOptions {
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
}

export interface DialogOpenResult extends DialogResult {
    filePath: string;
}

export interface DialogSaveResult extends DialogResult {
    filePaths: string[];
}
