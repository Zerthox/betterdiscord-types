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
