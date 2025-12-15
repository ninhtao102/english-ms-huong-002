export interface CategoriesDto {
    id?: number;
    code?: string;
    name?: string;
    description?: string;
    shortDescription?: string;
    parentId?: number;
    level?: number;
}

export interface CategoriesSearch {
    keyword?: string;
    type?: number;
    pageIndex?: number;
    pageSize?: number;
}
