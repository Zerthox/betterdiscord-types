export interface TextInputProps {
    value: string;
    maxLength?: number;
    placeholder?: string;
    onKeyDown?: React.KeyboardEventHandler;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

export type TextInput = React.ComponentType<TextInputProps>;
