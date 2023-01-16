import { TypeAnswerData } from "./types";

type AnswerItemProps = {
    answer: TypeAnswerData;
    handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedId: number;
}


export default function AnswerItem(props: AnswerItemProps) {
    return <div>
        <input value={props.answer.id} type="checkbox" onChange={props.handleCheck} checked={props.selectedId === props.answer.id}/>
        <span>{props.answer.name}</span>
    </div>
}
