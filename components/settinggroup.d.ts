import { ColorInputProps } from "./colorinput";
import { DropdownInputProps } from "./dropdowninput";
import { FileInputProps } from "./fileinput";
import { KeybindInputProps } from "./keybindinput";
import { NumberInputProps } from "./numberinput";
import { RadioInputProps } from "./radioinput";
import { SliderInputProps } from "./sliderinput";
import { SwitchInputProps } from "./switchinput";
import { TextInputProps } from "./textinput";

export interface BaseSetting {
    type: string;
    id: string;
    name: string;
    note: string;
    inline?: boolean;
    hidden?: boolean;
}

type SettingType<T extends string, P> = { type: T } & BaseSetting & P;

export type DropdownSetting<T = unknown> = SettingType<
    "dropdown",
    DropdownInputProps<T>
>;

export type NumberSetting = SettingType<"number", NumberInputProps>;

export type SwitchSetting = SettingType<"switch", SwitchInputProps>;

export type TextSetting = SettingType<"text", TextInputProps>;

export type FileSetting = SettingType<"file", FileInputProps>;

export type SliderSetting = SettingType<"slider", SliderInputProps>;

export type RadioSetting<T = unknown> = SettingType<
    "radio",
    RadioInputProps<T>
>;

export type KeybindSetting = SettingType<"keybind", KeybindInputProps>;

export type ColorSetting = SettingType<"color", ColorInputProps>;

export type CustomSetting = SettingType<"custom", CustomSettingProps>;

export interface CustomSettingProps {
    children: React.ReactNode;
}

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
    id: string;
    name?: string;
    settings: Setting[];
    shown?: boolean;
    showDivider?: boolean;
    collapsible?: boolean;
    children?: React.ReactNode;
    onChange?: (id: string, settingId: string, value: any) => void;
    onDrawerToggle?: (collapsed: boolean) => void;
}

export type SettingGroup = React.ComponentType<SettingGroupProps>;
