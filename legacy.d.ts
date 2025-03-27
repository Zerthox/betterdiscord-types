import type { Fiber } from "react-reconciler";

import type { Cancel } from "./index.d.ts";
import type { ModuleFilter } from "./webpack.d.ts";
import type {
    CloseNotice,
    ConfirmationModalOptions,
    DialogOpenOptions,
    DialogOpenResult,
    DialogSaveOptions,
    DialogSaveResult,
    NoticeOptions,
    ToastOptions,
} from "./ui.d.ts";

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
     * @deprecated Use {@link BdApi.UI.alert} instead.
     */
    alert(title: string, children: React.ReactNode): void;

    /**
     * Shows a generic but customizable confirmation modal with optional confirm and cancel callbacks.
     * @deprecated Use {@link BdApi.UI.showConfirmationModal} instead.
     */
    showConfirmationModal(
        title: string,
        content: React.ReactNode,
        options?: ConfirmationModalOptions,
    ): void;

    /**
     * Shows a notice above Discord's chat layer. Returns a callback for closing the notice.
     * @deprecated Use {@link BdApi.UI.showNotice} instead.
     */
    showNotice(content: string | Node, options?: NoticeOptions): CloseNotice;

    /**
     * Shows a toast towards the bottom of the screen.
     * @deprecated Use {@link BdApi.UI.showToast} instead.
     */
    showToast(content: string, options?: ToastOptions): void;

    /**
     * Opens an Electron dialog.
     * @deprecated Use {@link BdApi.UI.openDialog} instead.
     */
    openDialog(options: DialogSaveOptions): Promise<DialogSaveResult>;
    openDialog(options: DialogOpenOptions): Promise<DialogOpenResult>;

    /**
     * Loads previously stored data.
     * @deprecated Use {@link BdApi.Data.load} instead.
     */
    loadData(pluginName: string, key: string): any;

    /**
     * Saves JSON-serializable data.
     * @deprecated Use {@link BdApi.Data.save} instead.
     */
    saveData(pluginName: string, key: string, data: any): void;

    /**
     * Deletes a piece of stored data. This is different than saving `null` or `undefined`.
     * @deprecated Use {@link BdApi.Data.delete} instead.
     */
    deleteData(pluginName: string, key: string): void;

    /**
     * Adds a `<style>` to the document with the given ID.
     * @deprecated Use {@link BdApi.DOM.addStyle} instead.
     */
    injectCSS(id: string, styles: string): void;

    /**
     * Removes a `<style>` from the document corresponding to the given ID.
     * @deprecated Use {@link BdApi.DOM.removeStyle} instead.
     */
    clearCSS(id: string): void;

    /**
     * Adds a listener for when the node is removed from the document body.
     * @deprecated Use {@link BdApi.DOM.onRemoved} instead.
     */
    onRemoved(node: HTMLElement, callback: () => void): void;

    /**
     * Returns the internal React data (fiber) of a specific node.
     * @deprecated Use {@link BdApi.ReactUtils.getInternalInstance} instead.
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
    suppressErrors<F extends (...args: any) => any>(
        method: F,
        message: string,
    ): F;

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
