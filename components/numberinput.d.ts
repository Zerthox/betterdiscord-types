export interface NumberInputProps {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
}

export type NumberInput = React.ComponentType<NumberInputProps>;
