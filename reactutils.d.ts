import { Fiber } from "react-reconciler";

export interface ReactUtils {
    get rootInstance(): any;

    /** Gets the internal react data of a specified node. */
    getInternalInstance(node: HTMLElement): Fiber | undefined;

    /**
     * Attempts to find the "owner" node to the current node.
     * This is generally a node with an instance of a class component as `stateNode`.
     */
    getOwnerInstance(
        node: HTMLElement,
        options?: GetOwnerInstanceOptions,
    ): React.Component<any, any> | null;

    /** Creates an unrendered react component that wraps dom elements. */
    wrapElement(element: HTMLElement): React.ComponentClass;
}

export interface GetOwnerInstanceOptions {
    include?: string[];
    exclude?: string[];
    filter?: (node: React.Component<any, any>) => boolean;
}
