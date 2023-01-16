type TypeQuizResultData = {
    name: string,
    total_answers: number,
    score: number
}

type TypeQuizResultFetch = {
    id: number,
    quiz_template: number;
    score: number
}

export type { TypeQuizResultData, TypeQuizResultFetch }
