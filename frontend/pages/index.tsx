import { useRouter } from 'next/router'
import { OutlineButton, BorderedButton }  from '@/components/Buttons/StyledButtons'


export default function Home() {
  const router = useRouter()

  return (
    <>
      <BorderedButton insideText={`Available Quizzes`} onClick={() => router.push('/QuizList')}/>
      <OutlineButton insideText={`My results`} onClick={() => router.push('/QuizResult')}/>
    </>
  )
}
