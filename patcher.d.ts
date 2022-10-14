import { Cancel } from "./index";

type FnOrAny<F> = F extends (...args: any) => any ? F : any;

export interface Patcher {
    /**
     * Patches a function, executing the callback before it was called.
     * This allows modifying the arguments being passed to the original.
     */
    before<M, K extends keyof M>(
        caller: string,
        moduleToPatch: M,
        functionName: K,
        callback: PatchBeforeCallback<FnOrAny<M[K]>>,
    ): Cancel;

    /**
     * Patches a function, executing the callback after it was called.
     * This allows modifying the return value from the original.
     */
    after<M, K extends keyof M>(
        caller: string,
        moduleToPatch: M,
        functionName: K,
        callback: PatchAfterCallback<FnOrAny<M[K]>>,
    ): Cancel;

    /**
     * Patches a function, executing the callback instead of the original.
     * This allows completely replacing the original.
     */
    instead<M, K extends keyof M>(
        caller: string,
        moduleToPatch: M,
        functionName: K,
        callback: PatchInsteadCallback<FnOrAny<M[K]>>,
    ): Cancel;

    /** Returns all patches for the given caller. */
    getPatchesByCaller(caller: string): PatchInfo[];

    /** Removes all patches created by the given caller. */
    unpatchAll(caller: string): void;
}

export type PatchBeforeCallback<O extends (...args: any) => any> = (
    thisObject: ThisParameterType<O>,
    methodArguments: Parameters<O>,
) => any;

export type PatchAfterCallback<O extends (...args: any) => any> = (
    thisObject: ThisParameterType<O>,
    methodArguments: Parameters<O>,
    returnValue: ReturnType<O>,
) => any;

export type PatchInsteadCallback<O extends (...args: any) => any> = (
    thisObject: ThisParameterType<O>,
    methodArguments: Parameters<O>,
    originalMethod: O,
) => any;

export interface PatchInfo {
    callback: (...args: any) => any;
    caller: string;
    id: number;
    type: "before" | "after" | "instead";
    unpatch: Cancel;
}
