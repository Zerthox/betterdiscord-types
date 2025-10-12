export type ButtonTypes = "button" | "submit" | "reset";

export const enum ButtonLooks {
    FILLED = "bd-button-filled",
    OUTLINED = "bd-button-outlined",
    LINK = "bd-button-link",
    BLANK = "bd-button-blank",
}

export const enum ButtonColors {
    BRAND = "bd-button-color-brand",
    BLURPLE = "bd-button-color-blurple",
    RED = "bd-button-color-red",
    GREEN = "bd-button-color-green",
    YELLOW = "bd-button-color-yellow",
    PRIMARY = "bd-button-color-primary",
    LINK = "bd-button-color-link",
    WHITE = "bd-button-color-white",
    TRANSPARENT = "bd-button-color-transparent",
    CUSTOM = "",
}

export const enum ButtonSizes {
    NONE = "",
    TINY = "bd-button-tiny",
    SMALL = "bd-button-small",
    MEDIUM = "bd-button-medium",
    LARGE = "bd-button-large",
    ICON = "bd-button-icon",
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: ButtonTypes;
    look?: ButtonLooks;
    color?: ButtonColors;
    size?: ButtonSizes;
    disabled?: boolean;
    grow?: boolean;
    className?: string;
    children?: React.ReactNode;
    buttonRef?: React.RefObject<HTMLElement>;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export type Button = React.ComponentType<ButtonProps> & {
    Looks: typeof ButtonLooks;
    Colors: typeof ButtonColors;
    Sizes: typeof ButtonSizes;
};
