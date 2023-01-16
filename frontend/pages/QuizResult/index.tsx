import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { TypeQuizResultFetch } from '@/components/QuizResult/type'
import QuizResultDetail from '@/components/QuizResult/QuizResultDetail'


export default function QuizResult() {
    const router = useRouter()
    const[quizResultData, setQuizResultData]= useState<TypeQuizResultFetch[]>([])

    const getQuizResultData = async () => {
        const { data } = await axios.get(`http://localhost:8000/api/v1/quiz-acknowledgement/`)
        setQuizResultData(data.results)
    };
    
    useEffect(() => {
        getQuizResultData();
    }, []);

    return (
        <>
            {quizResultData.map((quizResultItem: TypeQuizResultFetch) => {
                return <QuizResultDetail key={quizResultItem.id} quizResultId={quizResultItem.id}/>
            })}
            <button type="button" onClick={() => router.push('/')}>
                Back
            </button>
        </>
    )
}