import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { MidtermExamHeader, Problem } from './ExamComponents';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Problem as Problem1, description as problem1Description} from './problems/problem_1';
import problem1gif from './images/problem_1.gif';
import {Problem as Problem2, description as problem2Description} from './problems/problem_2';
import problem2gif from './images/problem_2.gif';
import {Problem as Problem3, description as problem3Description} from './problems/problem_3';
import problem3gif from './images/problem_3.gif';
import {Problem as Problem4, description as problem4Description} from './problems/problem_4';
import problem4gif from './images/problem_4.gif';
import {Problem as Problem5, description as problem5Description} from './problems/problem_5';
import problem5gif from './images/problem_5.gif';

const EXAM_NAME = 'SI 579 Midterm 2';
const SHORT_EXAM_NAME = 'Midterm 2';
const EXAM_LINK = 'https://umich.instructure.com/courses/475967/assignments/1547537';
const due = new Date('Mon Nov 22 2021 16:05:00 GMT-0500 (Eastern Standard Time)')
const instructions = `
Complete all of the questions below. **You should only need to edit the files under the \`src/problems/\` directory.** If you have any questions, please ask them via Slack in the #si-579-f21 channel.

When you are done, upload your code to GitHub and post the link to your code on Canvas (under [the ${SHORT_EXAM_NAME} assignment](${EXAM_LINK})). You do **not** need to deploy your application to
GitHub pages.
`

ReactDOM.render(<>
    <Helmet>
        <title>{EXAM_NAME}</title>
    </Helmet>
    <MidtermExamHeader name={EXAM_NAME} shortName={SHORT_EXAM_NAME} link={EXAM_LINK} due={due} instructions={instructions} />
    <main>
        <Problem number={1} description={problem1Description} sampleOutputGifURL={problem1gif}><Problem1 /></Problem>
        <Problem number={2} description={problem2Description} sampleOutputGifURL={problem2gif}><Problem2 initial={1} min={0} max={10} /></Problem>
        <Problem number={3} description={problem3Description} sampleOutputGifURL={problem3gif}><Problem3 /></Problem>
        <Problem number={4} description={problem4Description} sampleOutputGifURL={problem4gif}><Problem4 /></Problem>
        <Problem number={5} description={problem5Description} sampleOutputGifURL={problem5gif}><Problem5 /></Problem>
    </main>
</>, document.getElementById('root'));