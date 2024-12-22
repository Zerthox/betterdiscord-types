export interface Logger {
    /** Logs an error using a collapsed error group with stacktrace. */
    stacktrace(pluginName: string, message: any, error: Error): void;

    /** Logs an error message. */
    error(pluginName: string, ...message: any[]): void;

    /** Logs a warning message. */
    warn(pluginName: string, ...message: any[]): void;

    /** Logs an informational message. */
    info(pluginName: string, ...message: any[]): void;

    /** Logs used for debugging purposes. */
    debug(pluginName: string, ...message: any[]): void;

    /** Logs used for basic logging. */
    log(pluginName: string, ...message: any[]): void;
}

export interface BoundLogger {
    /** @see {@link Logger.stacktrace} */
    stacktrace(message: any, error: Error): void;

    /** @see {@link Logger.error} */
    error(...message: any[]): void;

    /** @see {@link Logger.warn} */
    warn(...message: any[]): void;

    /** @see {@link Logger.info} */
    info(...message: any[]): void;

    /** @see {@link Logger.debug} */
    debug(...message: any[]): void;

    /** @see {@link Logger.log} */
    log(...message: any[]): void;
}
