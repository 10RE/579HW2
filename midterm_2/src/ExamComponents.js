import {useState, useEffect, createRef} from 'react';
import DateTimePicker from 'react-datetime-picker';
import ReactMarkdown from 'react-markdown'

export function MidtermExamHeader({name, shortName, link, due, instructions}) {
    const [dueTime, setDueTime] = useState(due);

    return <header className="container">
        <div className="row"><h1 className="col">{name}</h1></div>
        <div className="row"><div className="col exam instructions">
            <ReactMarkdown children={instructions} />
        </div></div>
        <div className="row" id="time-left">
            <div className="col-md-6">
                <label htmlFor="exam-due-date">Turn your exam in by:</label>
                <DateTimePicker value={dueTime} onChange={setDueTime} />
            </div>
            <div className="col-md-6">
                <output id="exam-time-left" className="float-end"><CountdownTimer toDate={dueTime} /></output>
            </div>
        </div>
    </header>;
}

function getSecondsDiff(date1, date2) {
    return Math.floor((date1.getTime() - date2.getTime())/1000);
}
function s(n) { return n===1 ? '' : 's' }


function CountdownTimer({toDate}) {
    const [totalSecondsRemaining, setSecondsLeft] = useState(getSecondsDiff(toDate, new Date()));
    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft(getSecondsDiff(toDate, new Date()));
        }, 1000);
        return () => clearInterval(interval);
    })

    const minutesLeft = Math.floor(totalSecondsRemaining/60);
    const secondsLeft = totalSecondsRemaining - 60 * minutesLeft;

    return `${minutesLeft} minute${s(minutesLeft)} and ${secondsLeft} second${s(secondsLeft)} remaining`;
}
export function Problem({number, description, sampleOutputGifURL, children}) {
    const [showSampleOutput, setShowSampleOutput] = useState(false);
    return <section className="container">
    <div className="row">
        <h2 className="col">Problem {number}</h2>
    </div>
    <div className="row">
        <div className="col problem instructions">
            <ReactMarkdown children={description} />
        </div>
    </div>
    <div className="row">
        <div className="sample-output col">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setShowSampleOutput(!showSampleOutput)}>{showSampleOutput ? "Hide desired result GIF" : "Show a GIF of the desired result"}</button>
            {showSampleOutput && <img src={sampleOutputGifURL} />}
        </div>
    </div>
    <div className="execution row">
        <div className="col">
            {children}
        </div>
    </div>
</section>
}