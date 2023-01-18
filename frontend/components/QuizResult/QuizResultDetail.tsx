import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { TypeQuizResultData } from '@/components/QuizResult/type'


export default function QuizResultDetail(props: { quizResultId: number }) {
    const [quizResultData, setQuizResultData] = useState<TypeQuizResultData>()

    const getQuizResultData = async () => {
        if (props.quizResultId) {
            const quizResultResponse = await axios.get(`http://localhost:8000/api/v1/quiz-acknowledgement/${props.quizResultId}/`)
            const quizResponse = await axios.get(`http://localhost:8000/api/v1/quizzes/${quizResultResponse.data.quiz_template}/`)
            const formatDate = new Date(quizResultResponse.data.date)
            setQuizResultData({
                name: quizResponse.data.name,
                date: formatDate.toLocaleString("en-US"),
                total_answers: quizResultResponse.data.instance_questions.length,
                score: quizResultResponse.data.score,
                approve_score: quizResponse.data.approve_score,
            })
        }
    };

    useEffect(() => {
        getQuizResultData();
    }, []);

    return (typeof quizResultData !== 'undefined')
        ? (<div className="p-6 m-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{quizResultData.name}</h1>
            <h3 className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`On: ${quizResultData.date}`}</h3>
            <h3 className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`You got: ${Math.round(quizResultData.score * quizResultData.total_answers / 100)}/${quizResultData.total_answers}`}</h3>
            <h3 className={`bg-purple-600 font-bold ${(quizResultData.score > quizResultData.approve_score) ? 'text-green-400': 'text-red-900'} py-2 px-4 w-full text-right align-right`}>{`Score: ${quizResultData.score}`}</h3>
        </div>) : <></>
}
