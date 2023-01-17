import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { TypeQuizResultData } from '@/components/QuizResult/type'


export default function QuizResultDetail(props: { quizResultId: number }) {
    const [quizResultData, setQuizResultData] = useState<TypeQuizResultData>()

    const getQuizResultData = async () => {
        if (props.quizResultId) {
            const quizResultResponse = await axios.get(`http://localhost:8000/api/v1/quiz-acknowledgement/${props.quizResultId}/`)
            const quizResponse = await axios.get(`http://localhost:8000/api/v1/quizzes/${quizResultResponse.data.quiz_template}/`)
            setQuizResultData({
                name: quizResponse.data.name,
                total_answers: quizResultResponse.data.instance_questions.length,
                score: quizResultResponse.data.score,
            })
        }
    };

    useEffect(() => {
        getQuizResultData();
    }, []);

    return (typeof quizResultData !== 'undefined')
        ? (<div>
            <h1>{quizResultData.name}</h1>
            <h3>{`You got: ${Math.round(quizResultData.score * quizResultData.total_answers / 100)}/${quizResultData.total_answers}`}</h3>
            <h3>{`Score: ${quizResultData.score}`}</h3>
        </div>) : <></>
}
