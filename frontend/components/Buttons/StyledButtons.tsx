type DefaultButtonProps = {
    onClick: () => void;
    insideText: string;
}

function OutlineButton(props: DefaultButtonProps) {
    return <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded m-2" type="button" onClick={props.onClick}>
        {props.insideText}
    </button>
}

function BorderedButton(props: DefaultButtonProps) {
    return <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 border border-purple-700 rounded m-2" type="button" onClick={props.onClick}>
        <span className="inline-flex items-center">{props.insideText}<svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></span>
    </button>
}

function NavButton(props: DefaultButtonProps) {
    return <button className="text-purple-700 hover:bg-purple-700 hover:text-white py-2 px-4 m-2" type="button" onClick={props.onClick}>
        {props.insideText}
    </button>
}

export { OutlineButton, BorderedButton, NavButton };
