import { AnswersDto, answerSubmitsDto } from "./answers.model";

export interface QuestionsDto {
    id?: number;
    parentId?: number;
    questionType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    questionText?: string;
    readingPassage?: string;
    suggestAnswer?: string;
    difficultyLevel?: number;
    questionYear?: number;
    points?: number;
    photoUrl?: string;
    // photo?: File;
    answers?: AnswersDto[];
    answerDtos?: AnswersDto[];
    answerSubmits?: answerSubmitsDto[];
    completed: number;
}

export interface QuestionsSearch {
    questionText?: string;
    questionYear?: number;
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
