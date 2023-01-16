import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { TypeQuizResultData } from '@/components/QuizResult/type'
import QuizResultDetail from '@/components/QuizResult/QuizResultDetail'


export default function QuizResult() {
    const router = useRouter()
    const { quizResultId } = router.query
    

    return (<>
        <QuizResultDetail quizResultId={Number(quizResultId)}/>
        <button type="button" onClick={() => router.push('/')}>
            Back
        </button>
    </>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    };
}
