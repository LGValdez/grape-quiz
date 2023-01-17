type TypeAnswerData = {
    id: number;
    name: string;
    is_correct: boolean
}

type TypeQuestionData = {
    id: number;
    sequence: number;
    name: string;
    answers: TypeAnswerData[];
}

type TypeQuizData = {
    id: number;
    name: string;
    code: string;
    questions: TypeQuestionData[];
}

export type { TypeAnswerData, TypeQuestionData, TypeQuizData }
