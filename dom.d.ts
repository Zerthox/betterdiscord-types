import { Cancel } from ".";

export interface DOM {
    /** Current width of the user's screen. */
    get screenHeight(): number;

    /** Current height of the user's screen. */
    get screenWidth(): number;

    /** Adds a `<style>` to the document with the given ID. */
    addStyle(id: string, css: string): void;

    /** Removes a `<style>` from the document corresponding to the given ID. */
    removeStyle(id: string): void;

    /** Adds a listener for when the node is removed from the document body. */
    onRemoved(node: HTMLElement, callback: () => void): Cancel;

    /** Utility to help smoothly animate using JavaScript. */
    animate(
        update: (progress: number) => void,
        duration: number,
        options?: AnimateOptions,
    ): void;

    /**
     * Utility function to make creating DOM elements easier.
     * Acts similarly to `React.createElement`.
     */
    createElement(
        tag: string,
        options?: CreateElementOptions,
        child?: HTMLElement,
    ): HTMLElement;

    /**
     * Parses a string of HTML and returns the results.
     * If the second parameter is `true`, the parsed HTML will be returned as a document fragment.
     * This is extremely useful if you have a list of elements at the top level, they can then be appended all at once to another node.
     *
     * If the second parameter is `false`, then the return value will be the list of parsed nodes
     * and there were multiple top level nodes, otherwise the single node is returned.
     */
    parseHTML<F extends boolean = false>(
        html: string,
        fragment?: F,
    ): F extends true ? DocumentFragment : NodeList | HTMLElement;
}

export interface AnimateOptions {
    timing?: (timeFraction: number) => number;
}

export interface CreateElementOptions {
    id?: string;
    className?: string;
    target?: HTMLElement;
}
