import { QuestionsDto } from "./questions.model";

export interface HomeworksDto {
    homeworkAssignmentId?: number;
    studentId?: number;
    studentName?: string;

    id?: number;
    title?: string;
    description?: string;
    classId?: number;
    className?: string;
    assignedDate?: string;
    dueDate?: string;
    submittedAt?: string;
    questions: QuestionsDto[];
    totalSteps: number
    progress: HomeworkProgressDto;
    status?: number;
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
    { value: 1, label: 'questions.type.singleChoice' },
    { value: 2, label: 'questions.type.multipleChoice' },
    { value: 3, label: 'questions.type.reading' },
    { value: 4, label: 'questions.type.fillBlanks' },
    { value: 5, label: 'questions.type.rewrite' },
    { value: 6, label: 'questions.type.essay' },
];
