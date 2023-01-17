type DefaultButtonProps = {
    onClick: () => void;
    insideText: string;
}

function OutlineButton(props: DefaultButtonProps) {
    return <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2" type="button" onClick={props.onClick}>
        {props.insideText}
    </button>
}

function BorderedButton(props: DefaultButtonProps) {
    return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2" type="button" onClick={props.onClick}>
        {props.insideText}
    </button>
}

export { OutlineButton, BorderedButton };
