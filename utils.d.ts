import classNames from "classnames";

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
    debounce<F extends (...args: any) => any>(executor: F, delay: number): F;

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
