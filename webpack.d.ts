export interface Webpack {
    /** A Proxy that returns the module source by ID. */
    modules: Record<string, any>;

    /** A variety of filters useful for finding webpack modules. */
    Filters: Filters;

    /**
     * Searches for a module by value, returns module & matched key.
     * Useful in combination with patching.
     */
    getWithKey(filter: ModuleFilter, options?: WithKeyOptions): [any, string];

    /** Finds a module using a filter function. */
    getModule<F extends boolean>(
        filter: ModuleFilter,
        options?: SearchOptions<F>,
    ): ModuleResult<F>;

    /** Finds all modules matching a filter function. */
    getModules(filter: ModuleFilter, options?: BaseSearchOptions): any[];

    /** Finds multiple modules using multiple filters. */
    getBulk<Q extends ModuleQuery[]>(...queries: Q): ModuleBulkResult<Q>;

    /** Attempts to find a lazy loaded module, resolving when it is loaded. */
    waitForModule(
        filter: ModuleFilter,
        options?: WaitForModuleOptions,
    ): Promise<any>;

    /** Finds a module using its code. */
    getByRegex(regex: RegExp, options?: BaseSearchOptions): any;

    /** Finds all modules using its code. */
    getAllByRegex(regex: RegExp, options?: BaseSearchOptions): any[];

    /** Finds a single module using properties on its prototype. */
    getByPrototypeKeys(
        ...prototypes: WithOptions<string, BaseSearchOptions>
    ): any;

    /** Finds all modules with a set of properties of its prototype. */
    getAllByPrototypeKeys(
        ...prototypes: WithOptions<string, BaseSearchOptions>
    ): any[];

    /** Finds a single module using its own properties. */
    getByKeys(...props: WithOptions<string, BaseSearchOptions>): any;

    /** Finds all modules with a set of properties. */
    getAllByKeys(...props: WithOptions<string, BaseSearchOptions>): any[];

    /** Finds a single module using a set of strings. */
    getByStrings(...strings: WithOptions<string, BaseSearchOptions>): any;

    /** Finds all modules with a set of strings. */
    getAllByStrings(...strings: WithOptions<string, BaseSearchOptions>): any[];

    /** Finds an internal Store module using the name. */
    getStore(name: string): any;
}

export type WithOptions<T, B extends BaseSearchOptions> = [...T[], B] | T[];

export type ModuleFilter = (
    exports: any,
    module: {
        id: number;
        loaded: true;
        exports: any;
    },
    id: string,
) => boolean;

export interface BaseSearchOptions {
    defaultExport?: boolean;
    searchExports?: boolean;
}

export type ModuleResult<F extends boolean> = F extends false ? any[] : any;

export interface WithKeyOptions extends BaseSearchOptions {
    target?: any;
}

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
    /**
     * Generates a filter checking for a given set of property names.
     * @deprecated Use {@link Filters.byKeys} instead.
     */
    byProps(...props: string[]): ModuleFilter;

    /** Generates a filter checking for a given set of property names. */
    byKeys(...keys: string[]): ModuleFilter;

    /**
     * Generates a filter checking for a given set of properties on the prototype.
     * @deprecated Use {@link Filters.byPrototypeKeys} instead.
     * */
    byPrototypeFields(...prototypes: string[]): ModuleFilter;

    /** Generates a filter checking for a given set of property names on the object's prototype. */
    byPrototypeKeys(...prototypes: string[]): ModuleFilter;

    /** Generates a filter matching against a given regex. */
    byRegex(regex: RegExp): ModuleFilter;

    /** Generates a filter checking for given strings. */
    byStrings(...strings: string[]): ModuleFilter;

    /** Generates a filter checking for a given `displayName`. */
    byDisplayName(name: string): ModuleFilter;

    /** Generates a filter checking for a specific internal Store name. */
    byStoreName(name: string): ModuleFilter;

    /** Generates a combined filter from multiple filters. */
    combine(...filters: ModuleFilter[]): ModuleFilter;
}
