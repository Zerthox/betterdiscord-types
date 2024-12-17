import { Meta, PluginCallback, PluginClass, Plugin } from "./plugin";

interface AddonInfo extends Meta {
    added: number;
    filename: string;
    format: string;
    id: string;
    modified: number;
    size: number;
    slug: string;
}

export interface PluginInfo extends AddonInfo {
    exports: Plugin | PluginClass | PluginCallback;
    instance: any;
}

export interface ThemeInfo extends AddonInfo {
    css: string;
}

interface AddonAPI<T extends AddonInfo> {
    folder: string;
    get(idOrFile: string): T;
    getAll(): T[];
    enable(idOrFile: string): void;
    disable(idOrFile: string): void;
    isEnabled(idOrFile: string): boolean;
    reload(idOrFile: string): void;
    toggle(idOrFile: string): void;
}

export interface Plugins extends AddonAPI<PluginInfo> {}
export interface Themes extends AddonAPI<ThemeInfo> {}
