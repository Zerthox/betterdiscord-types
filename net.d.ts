export interface Net {
    /**
     * Fetches a resource from the network while avoiding CORS errors.
     * Works similar to [node-fetch](https://www.npmjs.com/package/node-fetch).
     */
    fetch(url: string, options?: FetchOptions): Promise<FetchResponse>;
}

export type FetchMethod =
    | "GET"
    | "PUT"
    | "POST"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"
    | "CONNECT"
    | "TRACE";

export interface FetchOptions {
    method?: FetchMethod;
    headers?: Record<string, string>;
    redirect?: "manual" | "follow";
    maxRedirects?: number;
    signal?: AbortSignal;
    body?: Uint8Array | string;
    timeout?: number;
}

export interface FetchResponse extends Response {
    url: string;
    redirected: boolean;
}
