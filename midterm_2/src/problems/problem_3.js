import { useState, useRef } from "react";

export const description =
'Modify the code in `src/problem_3.js` so that the greeting message updates as the user types into the `<input />`\
 element, the greeting message updates. For example, if the user types `"Jane"` then the greeting\
 message should say `"Hello, Jane!"`. The updates should happen **as** the user types into the `<input />` element.';

export function Problem () {

    const [nameInput, setNameInput] = useState("");

    let nameInputRef = useRef();

    function nameChange () {
        setNameInput(nameInputRef.current.value);
    }

    return <>
        <label htmlFor="name_input">Enter your name: </label><input id="name_input" ref={nameInputRef} onChange={nameChange}/>
        <div>Hello, {nameInput}!</div>
    </>;
}
