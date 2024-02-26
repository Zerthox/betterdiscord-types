export interface UI {
    /** Shows a generic but customizable modal. */
    alert(title: string, content: React.ReactNode): void;

    /** Creates a tooltip to show on hover. */
    createTooltip(
        node: HTMLElement,
        content: string | HTMLElement,
        options?: TooltipOptions,
    ): Tooltip;

    /** Shows a generic but customizable confirmation modal with optional confirm and cancel callbacks. */
    showConfirmationModal(
        title: string,
        content: React.ReactNode,
        options?: ConfirmationModalOptions,
    ): string;

    /** Shows a toast towards the bottom of the screen. */
    showToast(content: string, options?: ToastOptions): void;

    /** Shows a notice above Discord's chat layer. */
    showNotice(content: string | Node, options?: NoticeOptions): CloseNotice;

    /** Opens an Electron dialog. */
    openDialog(options: DialogSaveOptions): Promise<DialogSaveResult>;
    openDialog(options: DialogOpenOptions): Promise<DialogOpenResult>;
}

export interface TooltipOptions {
    style?: "primary" | "info" | "success" | "warn" | "danger";
    side?: "top" | "right" | "bottom" | "left";
    preventFlip?: boolean;
    disabled?: boolean;
}

export type Tooltip = any;

export interface ConfirmationModalOptions {
    danger?: boolean;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export interface NoticeOptions {
    type?: "info" | "error" | "warning" | "success";
    buttons?: { label: string; onClick: () => void }[];
    timeout?: number;
}

export type CloseNotice = (immediately?: boolean) => void;

export interface ToastOptions {
    type?: "" | "info" | "success" | "danger" | "error" | "warning" | "warn";
    icon?: boolean;
    timeout?: number;
    forceShow?: boolean;
}

export interface DialogOptions {
    mode?: "open" | "save";
    defaultPath?: string;
    filters?: FileFilter[];
    title?: string;
    message?: string;
    showOverwriteConfirmation?: boolean;
    showHiddenFiles?: boolean;
    promptToCreate?: boolean;
    openDirectory?: boolean;
    openFile?: boolean;
    multiSelections?: boolean;
    modal?: boolean;
}

export interface FileFilter {
    name: string;
    extensions: string[];
}

export interface DialogOpenOptions extends DialogOptions {
    mode?: "open";
}

export interface DialogSaveOptions extends DialogOptions {
    mode: "save";
}

export interface DialogResult {
    canceled: boolean;
    filePath?: string;
    filePaths?: string[];
}

export interface DialogOpenResult extends Omit<DialogResult, "filePath"> {
    filePaths: string[];
}

export interface DialogSaveResult extends Omit<DialogResult, "filePaths"> {
    filePath: string;
}
