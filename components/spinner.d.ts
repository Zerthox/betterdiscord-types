export const enum SpinnerType {
    WANDERING_CUBES = "wandering-cubes",
    CHASING_DOTS = "chasing-dots",
    PULSING_ELLIPSIS = "pulsing-ellipsis",
    SPINNING_CIRCLE = "spinning-circle",
    SPINNING_CIRCLE_SIMPLE = "spinning-circle-simple",
    LOW_MOTION = "low-motion",
}

export interface SpinnerProps {
    type?: SpinnerType;
    animated?: boolean;
    className?: string;
    itemClassName?: string;
    "aria-label"?: string;
}

export type Spinner = React.ComponentType<SpinnerProps> & {
    Child: React.ComponentType<SpinnerProps>;
    Type: typeof SpinnerType;
};
