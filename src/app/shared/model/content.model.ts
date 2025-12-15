export interface ContentDto {
    id: number;
    code: string;
    name: string;
    description?: string;
    shortDescription?: string;
    createdDate?: string;
}

export interface ContentSearch {
    keyword?: string;
    pageIndex?: number;
    pageSize?: number;
}
