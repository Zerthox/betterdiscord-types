/** Interface for BetterDiscord plugins. */
export interface Plugin {
    start(): void;
    stop(): void;

    /** Contents of the plugin's settings panel. */
    getSettingsPanel?(): HTMLElement | JSX.Element | React.ComponentType;

    /**
     * Called on every mutation of the {@link document}.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observer
     */
    observer?(event: MutationRecord): void;

    /**
     * Called every time the view is "switched",
     * for example when the user changes navigates to a different channel or server.
     */
    onSwitch?(): void;

    /** @deprecated Initialize in module scope, in the constructor or on start instead. */
    load?(): void;

    /** @deprecated Use meta instead. */
    getName?(): string;

    /** @deprecated Use meta instead. */
    getAuthor?(): string;

    /** @deprecated Use meta instead. */
    getVersion?(): string;

    /** @deprecated Use meta instead. */
    getDescription?(): string;
}

/** A class constructing a BetterDiscord plugin. */
export interface PluginClass {
    new (meta: Meta): Plugin;
}

/** A function callback constructing a BetterDiscord plugin. */
export type PluginCallback = (meta: Meta) => Plugin;

/** Meta information about a BetterDiscord plugin. */
export interface Meta {
    name: string;
    author: string;
    description: string;
    version: string;
    invite?: string;
    authorId?: string;
    authorLink?: string;
    donate?: string;
    patreon?: string;
    website?: string;
    source?: string;
}
