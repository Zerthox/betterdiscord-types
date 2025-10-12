export interface SliderMarker {
    value: number;
    label: string;
}

export interface SliderInputProps {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    units?: string;
    markers?: (number | SliderMarker)[];
    onChange?: (value: number) => void;
}

export type SliderInput = React.ComponentType<SliderInputProps>;
