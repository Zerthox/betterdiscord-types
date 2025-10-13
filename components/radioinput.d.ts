export interface RadioOption<T> {
    name: string;
    value: T;
    color?: string;
    description?: string;

    /** @deprecated */
    desc?: string;
}

export interface RadioInputProps<T> {
    value: T;
    options: RadioOption<T>[];
    name?: string;
    disabled?: boolean;
    onChange?: (value: T) => void;
}

export type RadioInput<T> = React.FunctionComponent<RadioInputProps<T>>;
