type TypeQuizResultData = {
    id: number,
    quiz_template: number;
    instance_questions: number[];
    name: string,
    date: string,
    approve_score: number,
    score: number
}

type TypeQuizResultFetch = {
    id: number,
    quiz_template: number;
    score: number
}

export type { TypeQuizResultData, TypeQuizResultFetch }
