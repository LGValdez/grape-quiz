type TypeQuizResultData = {
    name: string,
    date: string,
    total_answers: number,
    approve_score: number,
    score: number
}

type TypeQuizResultFetch = {
    id: number,
    quiz_template: number;
    score: number
}

export type { TypeQuizResultData, TypeQuizResultFetch }
