import { useState } from "react";

const CLICK_COUNT_KEY = 'saved_click_count';

export const description =
'In `src/problem_4.js`, write code that allows the user to increment the click counter by clicking the "Clicked" `<button />`\
 element (or reset it to `0` by clicking the "Reset" `<button />`). Then, **use\
 [the `localStorage` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to make the click count\
 persistent**. When the user reloads the page, it should remember the number of clicks.\n\n\
 - *Note 1: your code should handle plural rules correctly; it should be "Clicked 1 time" and\
 "Clicked 2 time**s**".*\n\
 - *Note 2: remember that `localStorage` can only store **strings**.*\
 ';

export function Problem () {
    //localStorage.clear();
    let savedClickCount = parseInt(localStorage.getItem(CLICK_COUNT_KEY));

    if (savedClickCount === null) {
        savedClickCount = 0;
    }
    
    const [clickTimes, setClickTimes] = useState(savedClickCount);

    function clickCountAdd() {
        let localClickTimes = clickTimes + 1
        setClickTimes(localClickTimes);
        localStorage.setItem(CLICK_COUNT_KEY, localClickTimes);
    }

    function clickCountReset() {
        setClickTimes(0);
        localStorage.setItem(CLICK_COUNT_KEY, 0);
    }

    return <div className="btn-group">
            <button className="btn btn-primary" onClick={clickCountAdd}>Clicked {clickTimes} time{clickTimes===1?"":"s"}</button>
            <button className="btn btn-secondary" onClick={clickCountReset}>Reset</button>
        </div>;
    ;
}