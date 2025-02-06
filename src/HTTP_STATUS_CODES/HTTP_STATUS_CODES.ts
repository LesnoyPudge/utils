


/**
 * Status codes commonly returned by web servers.
 */
export namespace HTTP_STATUS_CODES {
    export const OK = 200;

    export type OK = typeof OK;

    export const BAD_REQUEST = 400;

    export type BAD_REQUEST = typeof BAD_REQUEST;

    export const UNAUTHORIZED = 401;

    export type UNAUTHORIZED = typeof UNAUTHORIZED;

    export const FORBIDDEN = 403;

    export type FORBIDDEN = typeof FORBIDDEN;

    export const NOT_FOUND = 404;

    export type NOT_FOUND = typeof NOT_FOUND;

    export const INTERNAL_SERVER_ERROR = 500;

    export type INTERNAL_SERVER_ERROR = typeof INTERNAL_SERVER_ERROR;
}