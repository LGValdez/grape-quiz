import axios from 'axios'
import nookies from 'nookies'
import { NextApiRequest, NextApiResponse } from 'next'
import QuizListItem from '@/components/QuizList/QuizListItem'
import { TypeQuizData } from '@/components/QuizPage/types'
import { serverAuthService } from '@/nextUtils/authentication'


export default function App(props: { quizList: TypeQuizData[] }) {
    return (
        <div className='flex flex-wrap mr-8 ml-8'>
            {props.quizList.map((quizItem: TypeQuizData) => {
                return <QuizListItem
                    key={quizItem.id}
                    quizTitle={quizItem.name}
                    quizDescription={quizItem.description}
                    quizId={quizItem.id} />
            })}
        </div>
    )
}


export async function getServerSideProps(ctx: { req: NextApiRequest, res: NextApiResponse }) {
    const cookies: { [key: string]: string } = nookies.get(ctx)
    if (serverAuthService.isAuthenticated(cookies)) {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_GRAPE_QUIZ_API_URL}quizzes/`, serverAuthService.getAuthHeader(cookies))
        return {
            props: {
                quizList: data.results
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
