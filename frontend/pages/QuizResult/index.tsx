import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { TypeQuizResultFetch } from '@/components/QuizResult/type'
import QuizResultDetail from '@/components/QuizResult/QuizResultDetail'
import { getAuthHeader } from '@/nextUtils/authentication'
import { isAuthenticated } from '@/nextUtils/authentication'


export default function QuizResult() {
    const router = useRouter()
    const [quizResultData, setQuizResultData] = useState<TypeQuizResultFetch[]>([])

    const getQuizResultData = async () => {
        const { data } = await axios.get(`http://localhost:8000/api/v1/quiz-acknowledgement/`, getAuthHeader())
        setQuizResultData(data.results)
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/Login')
        } else {
            getQuizResultData()
        }
    }, []);

    return (
        <>
            <div className='flex flex-wrap'>
                {quizResultData.map((quizResultItem: TypeQuizResultFetch) => {
                    return <QuizResultDetail key={quizResultItem.id} quizResultId={quizResultItem.id} />
                })}
            </div>
        </>
    )
}
