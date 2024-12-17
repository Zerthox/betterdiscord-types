import { Meta, PluginCallback, PluginClass } from "./plugin";

interface Addon extends Meta {
    added: number;
    filename: string;
    format: string;
    id: string;
    modified: number;
    size: number;
    slug: string;
}

export interface Plugin extends Addon {
    exports: PluginClass | PluginCallback;
    instance: any;
}

export interface Theme extends Addon {
    css: string;
}

interface AddonAPI<T extends Addon> {
    folder: string;
    get(idOrFile: string): T;
    getAll(): T[];
    enable(idOrFile: string): void;
    disable(idOrFile: string): void;
    isEnabled(idOrFile: string): boolean;
    reload(idOrFile: string): void;
    toggle(idOrFile: string): void;
}

export interface Plugins extends AddonAPI<Plugin> {}
export interface Themes extends AddonAPI<Theme> {}
