import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import QuestionItem from '../../../components/QuizPage/QuestionItem'
import { TypeQuizData, TypeQuestionData } from '../../../components/QuizPage/types'
import { OutlineButton, BorderedButton } from '@/components/Buttons/StyledButtons'
import { AuthService } from '@/nextUtils/authentication'
const DEFAULT_QUIZ_SIZE = 10


export default function QuizList() {
    const router = useRouter()
    const { quizId } = router.query
    const [answersPicked, setAnswersPicked] = useState<Map<number, number>>(new Map())
    const [randomQuestionIds, setRandomQuestionIds] = useState<number[]>([])
    const [quizData, setQuizData] = useState<TypeQuizData>()
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
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_GRAPE_QUIZ_API_URL}quizzes/${quizId}/`, AuthService.getAuthHeader())
            const pickedRandomQuestions = getRandom(data.questions, data.quiz_size || DEFAULT_QUIZ_SIZE)
            setRandomQuestionIds(pickedRandomQuestions.map((question) => question.id))
            setQuizData({
                id: data.id,
                name: data.name,
                description: data.description,
                code: data.code,
                approveScore: data.approve_score,
                quizSize: data.quiz_size,
                questions: pickedRandomQuestions,
            })
        }
    };

    useEffect(() => {
        getQuizData();
    }, []);

    const uploadResponse = async () => {
        if (typeof quizData !== 'undefined') {
            const questionIdList = quizData.questions.map((questionData) => questionData.id)
            const answerIdList = Array.from(answersPicked.values())
            const response = await axios.post(`${process.env.NEXT_PUBLIC_GRAPE_QUIZ_API_URL}quiz-acknowledgement/`, {
                user: 1,
                quiz_template: quizData.id,
                instance_questions: questionIdList,
                user_answers: answerIdList,
            }, AuthService.getAuthHeader())
            if (response.status == 201) {
                router.push(`/QuizResult/${response.data.id}`)
            }
        }
    }

    const showOneTimeResult = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_GRAPE_QUIZ_API_URL}quizzes-answers/${quizId}/`, AuthService.getAuthHeader())
        const randomQuestionsWithAnswers = randomQuestionIds.map((questionId) => data.questions.filter((question: TypeQuestionData) => questionId === question.id)[0])
        setQuizData({
            id: data.id,
            name: data.name,
            code: data.code,
            description: data.description,
            approveScore: data.approve_score,
            quizSize: data.quiz_size,
            questions: randomQuestionsWithAnswers,
        })
        setDisplayResult(true)
    }

    return (typeof quizData !== 'undefined') ? (<div className='p-10'>
        <div className='font-bold text-center p-5 text-2xl'>{quizData.name}</div>
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
    </div>) : <></>
}

export async function getServerSideProps() {
    return {
        props: {},
    };
}
