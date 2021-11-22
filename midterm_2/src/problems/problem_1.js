import {useState} from 'react';

export const description =
'The code in `src/problem_1.js` is supposed to allow users to enter a Fahrenheit temperature in the `<input />` element\
 and show the equivalent Celsius temperature underneath it. However, the Celsius temperature does not update.\
 Modify the value of `explanation` to briefly explain (in 1-3 sentences) why the current code does not work.\
 Then, update the code so that it works properly.\n\n\
 *Note: you do **not** need to handle non-numeric input. It\'s OK to have "NaN °F is NaN °C" if the user enters\
 something non-numeric for the Fahrenheit temperature.*\
 ';

const explanation = `React need to know what has changed in order to rerender the components. In the original code, react doesn't listen to variable celsius. By using useState for updating celsius, it informs react to rerender the celsius components.`;

function fToC(f) {
    return (f-32)/1.8;
}

export function Problem () {
    const [fahrenheit, setFahrenheit] = useState(-40);
    const [celsius, setCelsius] = useState(-40);

    function fahrenheitUpdated(ev) {
        const f = parseFloat(ev.target.value);
        const c = fToC(f);
        setFahrenheit(f);

        setCelsius(c);
    }

    return <>
        <label htmlFor='temp_f'>Enter a Fahrenheit temperature: </label><input id='temp_f' value={fahrenheit} onChange={fahrenheitUpdated} type='number' />
        <hr />
        {fahrenheit} &deg;F is {celsius.toFixed(2)} &deg;C
        <p>{explanation}</p>
    </>
}