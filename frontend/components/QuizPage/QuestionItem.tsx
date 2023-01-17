import React, { useState, useEffect } from 'react'
import { TypeQuestionData } from "./types"
import AnswerItem from "./AnswerItem"

type QuestionItemProps = {
    questionData: TypeQuestionData;
    index: number;
    handleAnswerPickChange: (questionId: number, answerId: number) => void;
    displayResult: boolean;
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

    return <div>
        <h3>{props.index}. {props.questionData.name}</h3>
        <div className="flex flex-wrap flex-col">
            {props.questionData.answers.map((answerData) =>{
                const answerItemProps = {
                    key: answerData.id,
                    answer: answerData,
                    handleCheck: handleCheck,
                    selectedId: selectedId,
                    isCorrect: props.displayResult ? answerData.is_correct : undefined,
                    disableInputs: props.displayResult,
                }
                return <AnswerItem {...answerItemProps}/>
            })}
        </div>
    </div>
}
