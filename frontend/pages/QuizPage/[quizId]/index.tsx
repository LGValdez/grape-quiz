import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import QuestionItem from '../../../components/QuizPage/QuestionItem'
import { TypeQuizData } from '../../../components/QuizPage/types';


export default function QuizList() {
    const router = useRouter()
    const { quizId } = router.query
    const [answersPicked, setAnswersPicked] = useState<Map<number, number>>(new Map())
    const [quizData, setQuizData] = useState<TypeQuizData>({
        id: 0,
        name: "",
        code: "",
        questions: []
    })

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
            setQuizData(data)
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

    return (
        <>
            <h1>{quizData.name}</h1>
            {quizData.questions.map((questionData, index) =>
                <QuestionItem key={questionData.id} questionData={questionData} index={index + 1} handleAnswerPickChange={handleAnswerPickChange}/>
            )}
            <button type="button" onClick={uploadResponse}>
              Submit
            </button>
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    };
}
