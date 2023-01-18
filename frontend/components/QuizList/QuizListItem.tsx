import { useRouter } from 'next/router'
import { BorderedButton }  from '@/components/Buttons/StyledButtons'

type QuizListItemProps = {
    quizId: number;
    quizTitle: string;
    quizDescription: string;
}


export default function QuizListItem(props: QuizListItemProps) {
    const router = useRouter()

    return <div className="basis-full p-6 m-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{props.quizTitle}</h1>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{props.quizDescription}</p>
        <BorderedButton insideText='Take Quiz ' onClick={() => router.push({
            pathname: '/QuizPage/[quizId]',
            query: { quizId: props.quizId }
        })}/>
    </div>
}