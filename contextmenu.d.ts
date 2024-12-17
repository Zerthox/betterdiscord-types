import { Cancel } from ".";

export interface ContextMenu extends ContextMenuComponents {
    /**
     * Allows you to patch a given context menu.
     * Acts as a wrapper around the `Patcher`.
     */
    patch(navId: string, callback: ContextMenuCallback): Cancel;

    /* Allows you to remove the patch added to a given context menu. */
    unpatch(navId: string, callback: ContextMenuCallback): Cancel;

    /**
     * Builds a single menu item.
     *
     * The only prop shown here is the type, the rest should match the actual component being built.
     * View those to see what options exist for each, they often have less in common than you might think.
     */
    buildItem(props: ContextMenuItemProps): React.ReactElement;

    /**
     * Creates the all the items **and groups** of a context menu recursively.
     *
     * There is no hard limit to the number of groups within groups or number of items in a menu.
     */
    buildMenuChildren(setup: ContextMenuSetup): React.ReactElement;

    /**
     * Creates the menu *component* including the wrapping `ContextMenu`.
     * Calls {@link ContextMenu.buildMenuChildren} under the covers.
     */
    buildMenu(setup: ContextMenuSetup): React.FunctionComponent<any>;

    /** Function that allows you to open an entire context menu. */
    open(
        event: React.MouseEvent,
        menuComponent: React.ComponentType<any>,
        config?: ContextMenuConfig,
    ): void;

    /** Closes the current opened context menu immediately. */
    close(): void;
}

export type ContextMenuCallback = (
    tree: React.ReactElement,
    props: any,
) => React.ReactElement | void;

export interface ContextMenuItemProps extends Record<string, any> {
    type?:
        | "text"
        | "submenu"
        | "toggle"
        | "radio"
        | "control"
        | "custom"
        | "separator";
}

export interface ContextMenuGroupProps {
    type: "group";
    items: ContextMenuItemProps[];
}

export type ContextMenuSetup = (ContextMenuItemProps | ContextMenuGroupProps)[];

export interface ContextMenuConfig {
    position?: "right" | "left";
    align?: "top" | "bottom";
    onClose?: (...args: any) => void;
    noBlurEvent?: boolean;
}

export interface ContextMenuComponents {
    Menu: React.FunctionComponent<any>;
    Group: React.FunctionComponent<any>;
    Item: React.FunctionComponent<any>;
    Separator: React.FunctionComponent<{}>;
    CheckboxItem: React.FunctionComponent<any>;
    ControlItem: React.FunctionComponent<any>;
    RadioItem: React.FunctionComponent<any>;
}
