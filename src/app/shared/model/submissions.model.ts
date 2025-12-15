export interface SubmissionsDto {
    id?: number;
    title?: string;
    description?: string;
    classId?: number;
    className?: string;
    dueDate?: string;
}

export interface SubmissionsSearch {
    title?: string;
    homeworkId?: number;
    classId?: number;
    studentId?: number;
    dueDateFrom?: string;
    dueDateTo?: string;
    submittedAtFrom?: string;
    submittedAtTo?: string;
    pageIndex?: number;
    pageSize?: number;
}

export const LIST_QUESTION_TYPES = [
    { value: 1, label: 'questions.type.singleChoice' },
    { value: 2, label: 'questions.type.multipleChoice' },
    { value: 3, label: 'questions.type.reading' },
    { value: 4, label: 'questions.type.fillBlanks' },
    { value: 5, label: 'questions.type.rewrite' },
    { value: 6, label: 'questions.type.essay' },
];
