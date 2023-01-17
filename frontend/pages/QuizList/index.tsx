import axios from 'axios'
import React, { useState, useEffect } from 'react'
import QuizListItem from '../../components/QuizList/QuizListItem';
import { TypeQuizData } from '@/components/QuizPage/types';

export default function QuizList() {
    const [quizList, setQuizList] = useState<TypeQuizData[]>([]);

    const getQuizData = async () => {
        const { data } = await axios.get(`http://localhost:8000/api/v1/quizzes/`)
        setQuizList(data.results)
    };

    useEffect(() => {
        getQuizData();
    }, []);

    return (
        <>
            {quizList.map((quizItem: TypeQuizData) => {
                return <QuizListItem
                    key={quizItem.id}
                    quizTitle={quizItem.name}
                    quizDescription={quizItem.description}
                    quizId={quizItem.id} />
            })}
        </>
    )
}