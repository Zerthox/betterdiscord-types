export interface SearchInputProps {
    placeholder?: string;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export type SearchInput = React.ComponentType<SearchInputProps>;
