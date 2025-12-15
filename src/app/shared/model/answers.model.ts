export interface AnswersDto {
    id?: number;
    answerText: string;
    questionId?: number;
    isCorrect?: boolean;
    orderIndex?: number;
}

export interface AnswersSearch {
    answerText?: string;
    questionId?: number;
    pageIndex?: number;
    pageSize?: number;
}
