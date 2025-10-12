export interface BaseFileInputProps {
    multiple?: boolean;
    accept?: string;
    clearable?: boolean;
    disabled?: boolean;
    actions?: FileInputActions;
    onChange?: (value: string[] | string) => void;
}

export interface FileInputActions {
    clear?: () => void;
}

export interface SingleFileInputProps extends BaseFileInputProps {
    multiple: true;
    onChange?: (value: string[]) => void;
}

export interface MultipleFileInputProps extends BaseFileInputProps {
    multiple?: false;
    onChange?: (value: string) => void;
}

export type FileInputProps = SingleFileInputProps | MultipleFileInputProps;

export type FileInput = React.ComponentType<FileInputProps>;
