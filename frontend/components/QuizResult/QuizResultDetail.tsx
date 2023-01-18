import { TypeQuizResultData } from '@/components/QuizResult/type'


export default function QuizResultDetail(props: { quizResultFetchedData: TypeQuizResultData}) {

    const getFormatDate = () => {
        const formatDate = new Date(props.quizResultFetchedData.date)
        return formatDate.toLocaleString("en-US")
    }

    return (typeof props.quizResultFetchedData !== 'undefined')
        ? (<div className="p-6 m-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.quizResultFetchedData.quiz_name}</h1>
            <h3 className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`On: ${getFormatDate()}`}</h3>
            <h3 className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`You got: ${props.quizResultFetchedData.correct_answers}/${props.quizResultFetchedData.total_questions}`}</h3>
            <h3 className={`bg-purple-600 font-bold ${(props.quizResultFetchedData.score > props.quizResultFetchedData.approve_score) ? 'text-green-400' : 'text-red-900'} py-2 px-4 w-full text-right align-right rounded-lg`}>{`Score: ${props.quizResultFetchedData.score}`}</h3>
        </div>) : <></>
}
