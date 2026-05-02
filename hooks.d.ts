import { Cancel } from ".";
import { FluxStore } from "./discord";

export interface Hooks {
    useForceUpdate(): [number, React.ActionDispatch<any>];
    useStateFromStores: <T>(
        stores: StoreType | StoreType[],
        factory: () => T,
        deps?: React.DependencyList,
        areStateEqual?: true | ((oldState: T, newState: T) => boolean),
    ) => T;
    useData<T>(pluginName: string, key: string): T;
}

export interface BoundHooks extends Omit<Hooks, "useData"> {
    useData<T>(key: string): T;
}

export type StoreType = Store | FluxStore;

export interface Store {
    initialize(): void;
    addChangeListener(callback: () => void): Cancel;
    removeChangeListener(callback: () => void): void;
    emitChange(): void;
}
