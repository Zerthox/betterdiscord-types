export interface Webpack {
    /** A Proxy that returns the module source by ID. */
    modules: Record<string, any>;

    /** A variety of filters useful for finding webpack modules. */
    Filters: Filters;

    /**
     * Searches for a module by value, returns module & matched key.
     * Useful in combination with patching.
     */
    getWithKey<T>(
        filter: ModuleFilter,
        options?: WithKeyOptions,
    ): WithKeyResult<T>;

    /** Finds a module using a filter function. */
    getModule<T>(filter: ModuleFilter, options?: SearchOptions<true>): T;
    getModule<T>(filter: ModuleFilter, options?: SearchOptions<false>): T[];
    getModule<T>(filter: ModuleFilter, options?: SearchOptions<boolean>): T;

    /** Finds all modules matching a filter function. */
    getModules<T>(filter: ModuleFilter, options?: BaseSearchOptions): T[];

    /** Finds multiple modules using multiple filters. */
    getBulk<Q extends ModuleQuery[]>(...queries: Q): ModuleBulkResult<Q>;

    /** Finds multiple modules using multiple filters on an object. */
    getBulkKeyed<T extends Record<string, ModuleQuery>>(queries: T): ModuleBulkKeyedResult<T>;

    /** Attempts to find a lazy loaded module, resolving when it is loaded. */
    waitForModule<T>(
        filter: ModuleFilter,
        options?: WaitForModuleOptions,
    ): Promise<T>;

    /** Finds a module using its code. */
    getByRegex<T>(regex: RegExp, options?: BaseSearchOptions): T;

    /** Finds all modules using its code. */
    getAllByRegex<T>(regex: RegExp, options?: BaseSearchOptions): T[];

    /** Finds a single module using properties on its prototype. */
    getByPrototypeKeys<T>(
        ...prototypes: WithOptions<string, BaseSearchOptions>
    ): T;

    /** Finds all modules with a set of properties of its prototype. */
    getAllByPrototypeKeys<T>(
        ...prototypes: WithOptions<string, BaseSearchOptions>
    ): T[];

    /** Finds a single module using its own properties. */
    getByKeys<T>(...props: WithOptions<string, BaseSearchOptions>): T;

    /** Finds all modules with a set of properties. */
    getAllByKeys<T>(...props: WithOptions<string, BaseSearchOptions>): T[];

    /** Finds a single module using a set of strings. */
    getByStrings<T>(...strings: WithOptions<string, BaseSearchOptions>): T;

    /** Finds all modules with a set of strings. */
    getAllByStrings<T>(...strings: WithOptions<string, BaseSearchOptions>): T[];

    /** Finds an internal Store module using the name. */
    getStore<T>(name: string): T;

    /** Finds a module with the given id. */
    getById<T>(id: PropertyKey): T;

    /** Finds a module with a filter, source, regex, or id, and returns an object with fixed keys that correspond to a mangled key on the module. */
    getMangled<T extends object>(
        filter: ModuleFilter | string | RegExp | number,
        mappers: Record<keyof T, ExportedOnlyFilter>,
        options?: BaseSearchOptions,
    ): T;
}

export type WithOptions<T, B extends BaseSearchOptions> = [...T[], B] | T[];

export interface Module {
    id: number;
    loaded: true;
    exports: any;
}

export type ModuleFilter = (
    exports: any,
    module?: Module,
    id?: string,
) => boolean;

export type ExportedOnlyFilter = (exports: any) => boolean;

export interface BaseSearchOptions {
    defaultExport?: boolean;
    searchExports?: boolean;
    fatal?: boolean;
    firstId?: PropertyKey;
    cacheId?: string | null;
}

export interface WithKeyOptions extends BaseSearchOptions {
    target?: any;
}

export type ModuleKey = string & {
    __MODULE_KEY_DUMMY_PROP: undefined;
};

export type WithKeyResult<T> = [{ [x: ModuleKey]: T }, ModuleKey];

export interface SearchOptions<F extends boolean> extends BaseSearchOptions {
    first?: F;
}

export interface ModuleQuery extends BaseSearchOptions {
    filter: ModuleFilter;
    all?: boolean;
    map?: Record<string, ExportedOnlyFilter>;
}

export type ModuleBulkResult<Q extends ModuleQuery[]> = {
    [I in keyof Q]: Q[I]["all"] extends true ? any[] : any;
};

export type ModuleBulkKeyedResult<T extends Record<string, ModuleQuery>> = {
    [K in keyof T]: T[K]["all"] extends true ? any[] : any;
}

export interface WaitForModuleOptions extends BaseSearchOptions {
    signal?: AbortSignal;
}

export interface Filters {
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

    /** Inverts a module filter. */
    not(filter: ModuleFilter): ModuleFilter;
}
