export interface ClassesDto {
    id?: number;
    className: string;
    classCode?: string;
    teacherId?: number;
    teacherName?: string;
    academicYear?: number;
    description?: string;
}

export interface ClassesSearch {
    keyword?: string;
    academicYear?: number;
    pageIndex?: number;
    pageSize?: number;
}
