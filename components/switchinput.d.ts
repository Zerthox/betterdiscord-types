export interface SwitchInputProps {
    id?: string;
    value: boolean;
    disabled?: boolean;
    onChange?: (value: boolean) => void;
    internalState?: boolean;
}

export type SwitchInput = React.ComponentType<SwitchInputProps>;
