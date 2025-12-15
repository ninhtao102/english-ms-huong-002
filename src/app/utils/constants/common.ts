export interface BaseResponse<T = any> {
    timestamp: string;
    body: T;
    message: string;
    status: string;
    code: number;
}

export interface PageResponse<T = any> {
    content: T[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    empty: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SIZE_OPTIONS: number[] = [10, 25, 50, 100];
export const RESPONSE_CODE_SUCCESS = 200;
// export const RESPONSE_CODE_FAIL = 400;
