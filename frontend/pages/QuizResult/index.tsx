import axios from 'axios'
import nookies from 'nookies'
import { NextApiRequest, NextApiResponse } from 'next'
import React, { useState, useEffect } from 'react'
import { TypeQuizResultData } from '@/components/QuizResult/type'
import QuizResultDetail from '@/components/QuizResult/QuizResultDetail'
import { serverAuthService } from '@/nextUtils/authentication'


export default function QuizResult(props: { quizResultData: TypeQuizResultData[] }) {
    const [localQuizResultData, setLocalQuizResultData] = useState<TypeQuizResultData[]>()

    useEffect(() => {
        setLocalQuizResultData(props.quizResultData);
    }, []);

    return (
        <> {
            (localQuizResultData)
                ? <div className='flex flex-wrap'>
                    {localQuizResultData.map((quizResultItem: TypeQuizResultData) => {
                        return <QuizResultDetail key={quizResultItem.id} quizResultFetchedData={quizResultItem} />
                    })}
                </div>
                : <></>
        }</>
    )
}


export async function getServerSideProps(ctx: { req: NextApiRequest, res: NextApiResponse }) {
    const cookies: { [key: string]: string } = nookies.get(ctx)
    if (serverAuthService.isAuthenticated(cookies)) {
        const authHeader = serverAuthService.getAuthHeader(cookies)
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_GRAPE_QUIZ_API_URL}quiz-acknowledgement/`, authHeader)
        return {
            props: {
                quizResultData: data.results
            }
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
