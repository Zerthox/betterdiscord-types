export type Color = number | string;

export interface ColorInputProps {
    value: Color;
    colors?: Color[];
    defaultValue?: Color;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

export type ColorInput = React.ComponentType<ColorInputProps>;
