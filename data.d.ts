export interface Data<T extends Record<string, any> = Record<string, any>> {
    /** Saves JSON-serializable data. */
    save<K extends keyof T>(pluginName: string, key: K, data: T[K]): void;

    /** Loads previously stored data. */
    load<K extends keyof T>(pluginName: string, key: K): T[K];

    /** Deletes a piece of stored data. This is different than saving as `null` or `undefined`. */
    delete(pluginName: string, key: keyof T): void;
}

export interface BoundData<
    T extends Record<string, any> = Record<string, any>,
> extends Data {
    /** @see {@link Data.save} */
    save<K extends keyof T>(key: K, data: T[K]): void;

    /** @see {@link Data.load} */
    load<K extends keyof T>(key: K): T[K];

    /** @see {@link Data.delete} */
    delete(key: keyof T): void;
}
