import { TypeAnswerData } from "./types";

type AnswerItemProps = {
    answer: TypeAnswerData;
    handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedId: number;
    isCorrect: boolean | undefined;
    disableInputs: boolean;
}


export default function AnswerItem(props: AnswerItemProps) {
    const displayCorrect = typeof props.isCorrect !== 'undefined'
    const isSelected = props.selectedId === props.answer.id
    return (
        <div className={
            `p-1 max-w-3xl 
                ${(displayCorrect && props.isCorrect) ? "border border-solid border-green-700" : ""} 
                ${(displayCorrect && isSelected) ? (props.isCorrect ? "text-green-700" : "text-red-700") : ""}`
        }>
            <input className="accent-purple-900" value={props.answer.id} type="checkbox" onChange={props.handleCheck} checked={isSelected} disabled={props.disableInputs} />
            <span className="pl-2">{props.answer.name}</span>
        </div>
    )
}
