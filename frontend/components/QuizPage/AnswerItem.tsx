import { TypeAnswerData } from "./types";

type AnswerItemProps = {
    answer: TypeAnswerData;
    handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedId: number;
    isCorrect: boolean | undefined;
    disableInputs: boolean;
}


export default function AnswerItem(props: AnswerItemProps) {
    const isCorrect =  props.isCorrect !== undefined ? (props.isCorrect ? "border border-solid border-green-700" : "") : ""
    const pickedCorrect = props.isCorrect !== undefined && props.selectedId === props.answer.id ? (props.isCorrect ? "text-green-700" : "text-red-700") : ""
    return <div className={`p-1 max-w-lg ${isCorrect} ${pickedCorrect}`}>
        <input value={props.answer.id} type="checkbox" onChange={props.handleCheck} checked={props.selectedId === props.answer.id} disabled={props.disableInputs}/>
        <span>{props.answer.name}</span>
    </div>
}
