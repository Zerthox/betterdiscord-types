export interface Data {
    /** Saves JSON-serializable data. */
    save(pluginName: string, key: string, data: any): void;

    /** Loads previously stored data. */
    load(pluginName: string, key: string): any;

    /** Deletes a piece of stored data. This is different than saving as `null` or `undefined`. */
    delete(pluginName: string, key: string): void;
}
