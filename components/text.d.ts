export const enum TextColors {
    STANDARD = "bd-text-normal",
    MUTED = "bd-text-muted",
    ERROR = "bd-text-error",
    BRAND = "bd-text-brand",
    LINK = "bd-text-link",
    HEADER_PRIMARY = "bd-header-primary",
    HEADER_SECONDARY = "bd-header-secondary",
    STATUS_YELLOW = "bd-text-yellow",
    STATUS_GREEN = "bd-text-green",
    STATUS_RED = "bd-text-red",
    ALWAYS_WHITE = "bd-text-white",
    CUSTOM = "",
}

export const enum TextSizes {
    SIZE_10 = "bd-text-10",
    SIZE_12 = "bd-text-12",
    SIZE_14 = "bd-text-14",
    SIZE_16 = "bd-text-16",
    SIZE_20 = "bd-text-20",
    SIZE_24 = "bd-text-24",
    SIZE_32 = "bd-text-32",
}

export interface TextProps<T = HTMLDivElement> extends React.HTMLAttributes<T> {
    tag?: T;
    color?: TextColors;
    size?: TextSizes;
    selectable?: boolean;
    strong?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export type Text = React.ComponentType<TextProps> & {
    Colors: typeof TextColors;
    Sizes: typeof TextSizes;
};
