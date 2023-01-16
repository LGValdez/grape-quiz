import { useRouter } from 'next/router'


type QuizListItemProps = {
    quizId: number;
    quizTitle: string;
    quizDescription: string;
}


export default function QuizListItem(props: QuizListItemProps) {
    const router = useRouter()

    return <>
        <h1>{props.quizTitle}</h1>
        <p>{props.quizDescription}</p>
        <button type="button" onClick={() => router.push({
            pathname: '/QuizPage/[quizId]',
            query: { quizId: props.quizId }
        })}>
            Take Quiz
        </button>
    </>
}