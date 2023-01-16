import axios from 'axios'
import React, { useState, useEffect } from 'react'
import QuizListItem from '../../components/QuizList/QuizListItem';

export default function QuizList() {
    const [quizList, setQuizList] = useState([]);

    const getQuizData = async () => {
        const { data } = await axios.get(`http://localhost:8000/api/v1/quizzes/`)
        setQuizList(data.results)
    };

    useEffect(() => {
        getQuizData();
    }, []);

    return (
        <>
            {quizList.map((quizItem) => {
                const quizName = quizItem['name']
                const quizId = quizItem['id']
                return <QuizListItem
                    key={quizId}
                    quizTitle={quizName}
                    quizDescription={quizName}
                    quizId={quizId} />
            })}
        </>
    )
}