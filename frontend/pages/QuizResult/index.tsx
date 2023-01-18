import axios from 'axios'
import nookies from 'nookies'
import { NextApiRequest, NextApiResponse } from 'next'
import React, { useState, useEffect } from 'react'
import { TypeQuizResultData } from '@/components/QuizResult/type'
import QuizResultDetail from '@/components/QuizResult/QuizResultDetail'
import { AuthService, serverAuthService } from '@/nextUtils/authentication'


export default function QuizResult() {
    const [quizResultData, setQuizResultData] = useState<TypeQuizResultData[]>([])

    const getQuizResultData = async () => {
        const authHeader = AuthService.getAuthHeader()
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_GRAPE_QUIZ_API_URL}quiz-acknowledgement/`, authHeader)
        setQuizResultData(data.results)
    };

    useEffect(() => {
        getQuizResultData()
    }, []);

    return (
        <>
            <div className='flex flex-wrap'>
                {quizResultData.map((quizResultItem: TypeQuizResultData) => {
                    return <QuizResultDetail key={quizResultItem.id} quizResultFetchedData={quizResultItem}/>
                })}
            </div>
        </>
    )
}


export async function getServerSideProps(ctx: { req: NextApiRequest, res: NextApiResponse }) {
    const cookies: { [key: string]: string } = nookies.get(ctx)
    if (serverAuthService.isAuthenticated(cookies)) {
        return {
            props: {}
        }
    }
    return {
        redirect: {
            destination: '/Login',
            permanent: false,
        },
        props: {},
    };
}
