import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import QuizResultDetail from '@/components/QuizResult/QuizResultDetail'
import { TypeQuizResultData } from '@/components/QuizResult/type'
import { AuthService } from '@/nextUtils/authentication'


export default function QuizResult() {
    const router = useRouter()
    const { quizResultId } = router.query
    const [quizResultFetchedData, setQuizResultFetchedData] = useState<TypeQuizResultData>()

    const getQuizResultData = async () => {
        if (quizResultId) {
            const authHeader = AuthService.getAuthHeader()
            const quizAcknowledgementResponse = await axios.get(`${process.env.NEXT_PUBLIC_GRAPE_QUIZ_API_URL}quiz-acknowledgement/${quizResultId}/`, authHeader)
            setQuizResultFetchedData(quizAcknowledgementResponse.data)
        }
    };

    useEffect(() => {
        getQuizResultData();
    }, []);
    

    return (<>
        {
            (typeof quizResultFetchedData !== 'undefined')
                ? <QuizResultDetail quizResultFetchedData={quizResultFetchedData}/>
                : <></>
        }
    </>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    };
}
