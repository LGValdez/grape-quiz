import { useRouter } from 'next/router'
import { BorderedButton }  from '@/components/Buttons/StyledButtons'

type QuizListItemProps = {
    quizId: number;
    quizTitle: string;
    quizDescription: string;
}


export default function QuizListItem(props: QuizListItemProps) {
    const router = useRouter()

    return <div>
        <h1>{props.quizTitle}</h1>
        <p>{props.quizDescription}</p>
        <BorderedButton insideText='Take Quiz' onClick={() => router.push({
            pathname: '/QuizPage/[quizId]',
            query: { quizId: props.quizId }
        })}/>
    </div>
}