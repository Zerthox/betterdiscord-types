import { Button } from "./button";
import { ColorInput } from "./colorinput";
import { DropdownInputProps } from "./dropdowninput";
import { ErrorBoundary } from "./errorboundary";
import { Flex } from "./flex";
import { KeybindInput } from "./keybindinput";
import { NumberInput } from "./numberinput";
import { RadioInputProps } from "./radioinput";
import { SearchInput } from "./searchinput";
import { SettingGroup } from "./settinggroup";
import { SettingItem } from "./settingitem";
import { SliderInput } from "./sliderinput";
import { Spinner } from "./spinner";
import { SwitchInput } from "./switchinput";
import { Text } from "./text";
import { TextInput } from "./textinput";

export { Button } from "./button";
export { ColorInput } from "./colorinput";
export { DropdownInput } from "./dropdowninput";
export { ErrorBoundary } from "./errorboundary";
export { Flex } from "./flex";
export { KeybindInput } from "./keybindinput";
export { NumberInput } from "./numberinput";
export { RadioInput } from "./radioinput";
export { SearchInput } from "./searchinput";
export { SettingGroup } from "./settinggroup";
export { SettingItem } from "./settingitem";
export { SliderInput } from "./sliderinput";
export { Spinner } from "./spinner";
export { SwitchInput } from "./switchinput";
export { Text } from "./text";
export { TextInput } from "./textinput";

export interface Components {
    Button: Button;
    Flex: Flex;
    Spinner: Spinner;
    Text: Text;

    /** Creates an error boundary with optional fallbacks and debug info. */
    ErrorBoundary: ErrorBoundary;

    ColorInput: ColorInput;
    DropdownInput: <T>(props: DropdownInputProps<T>) => React.ReactNode;
    KeybindInput: KeybindInput;
    NumberInput: NumberInput;
    RadioInput: <T>(props: RadioInputProps<T>) => React.ReactNode;
    SearchInput: SearchInput;
    SliderInput: SliderInput;
    SwitchInput: SwitchInput;
    TextInput: TextInput;

    SettingItem: SettingItem;
    SettingGroup: SettingGroup;

    /** Discord's tooltip component. */
    Tooltip: React.ComponentType<any> & Record<string, any>;
}
