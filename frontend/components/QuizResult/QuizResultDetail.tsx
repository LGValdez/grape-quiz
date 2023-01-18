import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { TypeQuizResultData } from '@/components/QuizResult/type'
import { AuthService } from '@/nextUtils/authentication'


export default function QuizResultDetail(props: { quizResultFetchedData: TypeQuizResultData}) {
    const [quizResultData, setQuizResultData] = useState<TypeQuizResultData>()

    const getQuizResultData = async () => {
        const authHeader = AuthService.getAuthHeader()
        const quizResponse = await axios.get(`${process.env.NEXT_PUBLIC_GRAPE_QUIZ_API_URL}quizzes/${props.quizResultFetchedData.quiz_template}/`, authHeader)
        const formatDate = new Date(props.quizResultFetchedData.date)
        setQuizResultData({
            id: quizResponse.data.id,
            instance_questions: props.quizResultFetchedData.instance_questions,
            quiz_template: quizResponse.data.quiz_template,
            name: quizResponse.data.name,
            date: formatDate.toLocaleString("en-US"),
            score: props.quizResultFetchedData.score,
            approve_score: quizResponse.data.approve_score,
        })
    };

    useEffect(() => {
        getQuizResultData();
    }, []);

    return (typeof quizResultData !== 'undefined')
        ? (<div className="p-6 m-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{quizResultData.name}</h1>
            <h3 className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`On: ${quizResultData.date}`}</h3>
            <h3 className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`You got: ${Math.round(quizResultData.score * quizResultData.instance_questions.length / 100)}/${quizResultData.instance_questions.length}`}</h3>
            <h3 className={`bg-purple-600 font-bold ${(quizResultData.score > quizResultData.approve_score) ? 'text-green-400' : 'text-red-900'} py-2 px-4 w-full text-right align-right rounded-lg`}>{`Score: ${quizResultData.score}`}</h3>
        </div>) : <></>
}
