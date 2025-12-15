import { QuestionsDto } from "./questions.model";

export interface HomeworksDto {
    id?: number;
    title?: string;
    description?: string;
    classId?: number;
    className?: string;
    assignedDate?: string;
    dueDate?: string;
    questions: QuestionsDto[];

    duration?: number;
    progress: HomeworkProgressDto;
}

export interface HomeworkProgressDto {
    completed: number;
    currentStep: number;
    totalSteps: number;
}

export interface HomeworksSearch {
    title?: string;
    classId?: string;
    assignedDateFrom?: string;
    assignedDateTo?: string;
    dueDateFrom?: string;
    dueDateTo?: string;
    pageIndex?: number;
    pageSize?: number;
}

export const LIST_QUESTION_TYPES = [
    { value: 0, label: 'questions.type.essay' },
    { value: 1, label: 'questions.type.singleChoice' },
    { value: 2, label: 'questions.type.multipleChoice' },
    { value: 3, label: 'questions.type.paragraph' },
];
