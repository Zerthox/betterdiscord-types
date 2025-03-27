import type { BdApi } from "./bdapi.d.ts";

export type * from "./addonapi.d.ts";
export type * from "./bdapi.d.ts";
export type * from "./components.d.ts";
export type * from "./contextmenu.d.ts";
export type * from "./data.d.ts";
export type * from "./dom.d.ts";
export type * from "./logger.d.ts";
export type * from "./net.d.ts";
export type * from "./patcher.d.ts";
export type * from "./plugin.d.ts";
export type * from "./reactutils.d.ts";
export type * from "./ui.d.ts";
export type * from "./utils.d.ts";
export type * from "./webpack.d.ts";
export type * from "./legacy.d.ts";

export type Cancel = () => void;

declare global {
    /** BetterDiscord's global plugin API. */
    const BdApi: BdApi;

    interface Window {
        /** BetterDiscord's global plugin API. */
        BdApi: BdApi;
    }
}
