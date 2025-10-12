export const enum FlexDirection {
    VERTICAL = "bd-flex-vertical",
    HORIZONTAL = "bd-flex-horizontal",
    HORIZONTAL_REVERSE = "bd-flex-reverse",
}

export const enum FlexJustify {
    START = "bd-flex-justify-start",
    END = "bd-flex-justify-end",
    CENTER = "bd-flex-justify-center",
    BETWEEN = "bd-flex-justify-between",
    AROUND = "bd-flex-justify-around",
}

export const enum FlexAlign {
    START = "bd-flex-align-start",
    END = "bd-flex-align-end",
    CENTER = "bd-flex-align-center",
    STRETCH = "bd-flex-align-stretch",
    BASELINE = "bd-flex-align-baseline",
}

export const enum FlexWrap {
    NO_WRAP = "bd-flex-no-wrap",
    WRAP = "bd-flex-wrap",
    WRAP_REVERSE = "bd-flex-wrap-reverse",
}

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    id?: string;
    shrink?: number;
    grow?: number;
    basis?: string;
    direction?: FlexDirection;
    align?: FlexAlign;
    justify?: FlexJustify;
    wrap?: FlexWrap;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export type Flex = React.ComponentType<FlexProps> & {
    Child: React.ComponentType<FlexProps>;
    Direction: typeof FlexDirection;
    Justify: typeof FlexJustify;
    Align: typeof FlexAlign;
    Wrap: typeof FlexWrap;
};
