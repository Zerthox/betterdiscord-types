export interface SettingItemProps {
    id: string;
    name?: string;
    note?: string;
    inline?: boolean;
    children?: React.ReactNode;
}

export type SettingItem = React.ComponentType<SettingItemProps>;
