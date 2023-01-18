import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import QuizListItem from '../../components/QuizList/QuizListItem'
import { TypeQuizData } from '@/components/QuizPage/types'
import { getAuthHeader, isAuthenticated } from '@/nextUtils/authentication'


export default function QuizList() {
    const router = useRouter()
    const [quizList, setQuizList] = useState<TypeQuizData[]>([]);

    const getQuizData = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_GRAPE_QUIZ_API_URL}quizzes/`, getAuthHeader())
        setQuizList(data.results)
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/Login')
        } else {
            getQuizData()
        }
    }, []);

    return (
        <div className='flex flex-wrap mr-8 ml-8'>
            {quizList.map((quizItem: TypeQuizData) => {
                return <QuizListItem
                    key={quizItem.id}
                    quizTitle={quizItem.name}
                    quizDescription={quizItem.description}
                    quizId={quizItem.id} />
            })}
        </div>
    )
}
