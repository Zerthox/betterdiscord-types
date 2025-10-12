export interface KeybindInputProps {
    value: string[];
    max?: number;
    clearable?: boolean;
    disabled?: boolean;
    onChange?: (value: string[]) => void;
}

export type KeybindInput = React.ComponentType<KeybindInputProps>;
