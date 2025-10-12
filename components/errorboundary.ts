export interface ErrorBoundaryProps {
    id?: string;
    name?: string;
    hideError?: boolean;
    fallback?: React.ReactNode;
    children?: React.ReactNode;
    onError?: (error: Error) => void;
}

export type ErrorBoundary = React.ComponentType<ErrorBoundaryProps>;
