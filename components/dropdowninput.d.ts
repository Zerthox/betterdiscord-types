export interface DropdownOption<T> {
    value: T;
    label: string;
    id?: string;
}

export type DropdownStyle = "default" | "transparent";

export interface DropdownInputProps<T> {
    value: T;
    options: DropdownOption<T>[];
    style?: DropdownStyle;
    disabled?: boolean;
    onChange?: (value: T) => void;
}

export type DropdownInput<T> = React.FunctionComponent<DropdownInputProps<T>>;
