import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()

  return (
    <>
      <button type="button" onClick={() => router.push('/QuizList')}>
        Take a quiz
      </button>
      <button type="button" onClick={() => router.push('/QuizResult')}>
        Check my results
      </button>
    </>
  )
}
