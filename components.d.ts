type ValueOf<T> = T[keyof T];

export interface Components {
    /** Discord's tooltip component. */
    Tooltip: React.ComponentType<any> & {
        Colors: any;
    };

    /** Creates an error boundary with optional fallbacks and debug info. */
    ErrorBoundary: React.ComponentType<ErrorBoundaryProps>;

    Text: React.ComponentType<TextProps> & {
        Colors: TextColors;
        Sizes: TextSizes;
    };

    Flex: React.ComponentType<FlexProps> & {
        Child: React.ComponentType<FlexProps>;
        Direction: FlexDirection;
        Justify: FlexJustify;
        Align: FlexAlign;
        Wrap: FlexWrap;
    };

    Button: React.ComponentType<ButtonProps> & {
        Looks: ButtonLooks;
        Colors: ButtonColors;
        Sizes: ButtonSizes;
    };

    ColorInput: React.ComponentType<ColorInputProps>;
    DropdownInput: React.ComponentType<DropdownInputProps>;
    SettingItem: React.ComponentType<SettingItemProps>;
    KeybindInput: React.ComponentType<KeybindInputProps>;
    NumberInput: React.ComponentType<NumberInputProps>;
    RadioInput: React.ComponentType<RadioInputProps>;
    SearchInput: React.ComponentType<SearchInputProps>;
    SliderInput: React.ComponentType<SliderInputProps>;
    SwitchInput: React.ComponentType<SwitchInputProps>;
    TextInput: React.ComponentType<TextInputProps>;
    SettingGroup: React.ComponentType<SettingGroupProps>;
}

export interface ErrorBoundaryProps {
    children: React.ReactNode;
    id?: string;
    name?: string;
    hideError?: boolean;
    fallback?: React.ReactNode;
    onError?: (e: Error) => void;
}

interface TextColors {
    STANDARD: "bd-text-normal";
    MUTED: "bd-text-muted";
    ERROR: "bd-text-error";
    BRAND: "bd-text-brand";
    LINK: "bd-text-link";
    HEADER_PRIMARY: "bd-header-primary";
    HEADER_SECONDARY: "bd-header-secondary";
    STATUS_YELLOW: "bd-text-yellow";
    STATUS_GREEN: "bd-text-green";
    STATUS_RED: "bd-text-red";
    ALWAYS_WHITE: "bd-text-white";
    CUSTOM: null;
}

interface TextSizes {
    SIZE_10: "bd-text-10";
    SIZE_12: "bd-text-12";
    SIZE_14: "bd-text-14";
    SIZE_16: "bd-text-16";
    SIZE_20: "bd-text-20";
    SIZE_24: "bd-text-24";
    SIZE_32: "bd-text-32";
}

export interface TextProps {
    tag?: string;
    className?: string;
    children: React.ReactNode;
    color?: ValueOf<TextColors>;
    size?: ValueOf<TextSizes>;
    selectable?: boolean;
    strong?: boolean;
    style?: React.CSSProperties;
}

interface FlexDirection {
    VERTICAL: "bd-flex-vertical";
    HORIZONTAL: "bd-flex-horizontal";
    HORIZONTAL_REVERSE: "bd-flex-reverse";
}

interface FlexJustify {
    START: "bd-flex-justify-start";
    END: "bd-flex-justify-end";
    CENTER: "bd-flex-justify-center";
    BETWEEN: "bd-flex-justify-between";
    AROUND: "bd-flex-justify-around";
}

interface FlexAlign {
    START: "bd-flex-align-start";
    END: "bd-flex-align-end";
    CENTER: "bd-flex-align-center";
    STRETCH: "bd-flex-align-stretch";
    BASELINE: "bd-flex-align-baseline";
}

interface FlexWrap {
    NO_WRAP: "bd-flex-no-wrap";
    WRAP: "bd-flex-wrap";
    WRAP_REVERSE: "bd-flex-wrap-reverse";
}

export interface FlexProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    shrink?: number;
    grow?: number;
    basis?: string;
    direction?: ValueOf<FlexDirection>;
    align?: ValueOf<FlexAlign>;
    justify?: ValueOf<FlexJustify>;
    wrap?: ValueOf<FlexWrap>;
}

interface ButtonLooks {
    FILLED: "bd-button-filled";
    OUTLINED: "bd-button-outlined";
    LINK: "bd-button-link";
    BLANK: "bd-button-blank";
}

interface ButtonColors {
    BRAND: "bd-button-color-brand";
    BLURPLE: "bd-button-color-blurple";
    RED: "bd-button-color-red";
    GREEN: "bd-button-color-green";
    YELLOW: "bd-button-color-yellow";
    PRIMARY: "bd-button-color-primary";
    LINK: "bd-button-color-link";
    WHITE: "bd-button-color-white";
    TRANSPARENT: "bd-button-color-transparent";
    CUSTOM: "";
}

interface ButtonSizes {
    NONE: "";
    TINY: "bd-button-tiny";
    SMALL: "bd-button-small";
    MEDIUM: "bd-button-medium";
    LARGE: "bd-button-large";
    ICON: "bd-button-icon";
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    buttonRef?: React.RefObject<HTMLElement>;
    disabled?: boolean;
    look?: ValueOf<ButtonLooks>;
    color?: ValueOf<ButtonColors>;
    size?: ValueOf<ButtonSizes>;
    grow?: boolean;
}

export interface ColorInputProps {
    value: string | number;
    onChange?: (value: string) => void;
    colors?: number[];
    defaultValue?: string | number;
    disabled?: boolean;
}

export interface DropdownInputProps {
    value?: any;
    options: any[];
    style?: "transparent";
    onChange?: (value: any) => void;
    disabled?: boolean;
}

export interface SettingItemProps {
    id: string;
    name: string;
    note: string;
    inline?: boolean;
    children: React.ReactNode;
}

export interface KeybindInputProps {
    value: string[];
    onChange?: (value: string[]) => void;
    max?: number;
    clearable?: boolean;
    disabled?: boolean;
}

export interface NumberInputProps {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
}

export interface RadioInputProps {
    name: string;
    value: any;
    options: any[];
    onChange?: (value: any) => void;
    disabled?: boolean;
}

export interface SearchInputProps {
    onChange?: React.ChangeEventHandler;
    className?: string;
    onKeyDown?: React.KeyboardEventHandler;
    placeholder?: string;
}

export interface SliderInputProps {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    units?: string;
    markers?: number[];
}

export interface SwitchInputProps {
    id: string;
    value: boolean;
    disabled?: boolean;
    onChange?: (value: boolean) => void;
    internalState?: boolean;
}

export interface TextInputProps {
    value: string;
    maxLength?: number;
    placeholder?: string;
    onKeyDown?: React.KeyboardEventHandler;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

interface FileInputProps {
    multiple?: boolean;
    accept?: string;
    clearable?: boolean;
    onChange?: (value: string | string[]) => void;
    disabled?: boolean;
    actions?: any;
}

interface BaseSetting {
    type: string;
    id: string;
    name: string;
    note: string;
    inline?: boolean;
    hidden?: boolean;
}

type SettingType<T extends string, U> = BaseSetting & U & { type: T };

type DropdownSetting = SettingType<"dropdown", DropdownInputProps>;
type NumberSetting = SettingType<"number", NumberInputProps>;
type SwitchSetting = SettingType<"switch", SwitchInputProps>;
type TextSetting = SettingType<"text", TextInputProps>;
type FileSetting = SettingType<"file", FileInputProps>;
type SliderSetting = SettingType<"slider", SliderInputProps>;
type RadioSetting = SettingType<"radio", RadioInputProps>;
type KeybindSetting = SettingType<"keybind", KeybindInputProps>;
type ColorSetting = SettingType<"color", ColorInputProps>;
type CustomSetting = SettingType<"custom", { children: React.ReactNode }>;

export type Setting =
    | DropdownSetting
    | NumberSetting
    | SwitchSetting
    | TextSetting
    | FileSetting
    | SliderSetting
    | RadioSetting
    | KeybindSetting
    | ColorSetting
    | CustomSetting;

export interface SettingGroupProps {
    onChange?: (id: string, settingId: string, value: any) => void;
    id: string;
    name: string;
    shown?: boolean;
    onDrawerToggle?: (collapsed: boolean) => void;
    showDivider?: boolean;
    collapsible?: boolean;
    settings: Setting[];
    children?: React.ReactNode;
}
