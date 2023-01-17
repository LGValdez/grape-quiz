import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import QuestionItem from '../../../components/QuizPage/QuestionItem'
import { TypeQuizData, TypeQuestionData } from '../../../components/QuizPage/types'
import { OutlineButton, BorderedButton } from '@/components/Buttons/StyledButtons'
const DEFAULT_QUIZ_SIZE = 10


export default function QuizList() {
    const router = useRouter()
    const { quizId } = router.query
    const [answersPicked, setAnswersPicked] = useState<Map<number, number>>(new Map())
    const [randomQuestionIds, setRandomQuestionIds] = useState<number[]>([])
    const [quizData, setQuizData] = useState<TypeQuizData>({
        id: 0,
        name: "",
        code: "",
        questions: []
    })
    const [displayResult, setDisplayResult] = useState<boolean>(false)

    function getRandom(arr: any, n: number) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    const handleAnswerPickChange = (questionId: number, answerId: number) => {
        if (answerId != 0) {
            setAnswersPicked(answersPicked.set(questionId, answerId))

        } else {
            answersPicked.delete(questionId)
        }
    }

    const getQuizData = async () => {
        if (quizId) {
            const { data } = await axios.get(`http://localhost:8000/api/v1/quizzes/${quizId}/`)
            const pickedRandomQuestions = getRandom(data.questions, data.quiz_size || DEFAULT_QUIZ_SIZE)
            const sortedRandomQuestions = pickedRandomQuestions.sort((a: TypeQuestionData, b: TypeQuestionData) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
            setRandomQuestionIds(sortedRandomQuestions.map((question) => question.id))
            setQuizData({
                id: data.id,
                name: data.name,
                code: data.code,
                questions: sortedRandomQuestions,
            })
        }
    };

    useEffect(() => {
        getQuizData();
    }, []);

    const uploadResponse = async () => {
        const questionIdList = quizData.questions.map((questionData) => questionData.id)
        const answerIdList = Array.from(answersPicked.values())
        const response = await axios.post(`http://localhost:8000/api/v1/quiz-acknowledgement/`, {
            user: 1,
            quiz_template: quizData.id,
            instance_questions: questionIdList,
            user_answers: answerIdList,
        })
        if (response.status == 201) {
            router.push(`/QuizResult/${response.data.id}`)
        }
    }

    const showOneTimeResult = async () => {
        const { data } = await axios.get(`http://localhost:8000/api/v1/quizzes-answers/${quizId}/`)
        const randomQuestionsWithAnswers = data.questions.filter((question: TypeQuestionData) => randomQuestionIds.includes(question.id))
        const sortedRandomQuestions = randomQuestionsWithAnswers.sort((a: TypeQuestionData, b: TypeQuestionData) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
        setQuizData({
            id: data.id,
            name: data.name,
            code: data.code,
            questions: sortedRandomQuestions,
        })
        setDisplayResult(true)
    }

    return (
        <>
            <h1>{quizData.name}</h1>
            {quizData.questions.map((questionData, index) =>
                <QuestionItem
                    key={questionData.id}
                    questionData={questionData}
                    index={index + 1}
                    handleAnswerPickChange={handleAnswerPickChange}
                    displayResult={displayResult} />
            )}
            {displayResult
                ? <BorderedButton insideText='Submit' onClick={uploadResponse} />
                : <OutlineButton insideText='Verify' onClick={showOneTimeResult} />
            }
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    };
}
