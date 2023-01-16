import React, { useState, useEffect } from 'react'
import { TypeQuestionData } from "./types"
import AnswerItem from "./AnswerItem"

type QuestionItemProps = {
    questionData: TypeQuestionData;
    index: number;
    handleAnswerPickChange: (questionId: number, answerId: number) => void;
}


export default function QuestionItem(props: QuestionItemProps) {
    const [selectedId, setSelectedId] = useState<number>(0);

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        let currentSelectedId = 0
        if (event.target.checked) {
            currentSelectedId = Number(event.target.value)
        }
        props.handleAnswerPickChange(props.questionData.id, currentSelectedId)
        setSelectedId(currentSelectedId);
    };

    return <>
        <h3>{props.index}. {props.questionData.name}</h3>
        {props.questionData.answers.map((answerData) => <AnswerItem key={answerData.id} answer={answerData} handleCheck={handleCheck} selectedId={selectedId}/>)}
    </>
}
