import { useRef } from 'react';

export const description =
'The code in `src/problem_5.js` contains code that animates the red block by sliding it across the screen.\
 Modify the `step()` function (inside of `startAnimation()` so that the animation **bounces** the block\
 at the end of the animation (see the GIF below). You should use the `easeOutBounce()` function, which is an easing function\
 (similar to [the `easeInOutQuad` function from the animation lecture](https://observablehq.com/@soney/si-579-animation#cell-390))\
 \n\n\
 *Note: this should only require a minimal modification to the `step()` function (one call to `easeOutBounce` in the right place)*.\
 ';

function startAnimation(blockEl) { // blockEl is a DOM element.
    const duration = 2000; // The animation runs for 2 seconds
    const startX = 0;      // the block moves from x===0...
    const endX = 500;      // to x===500

    function setX(x) { blockEl.style.setProperty('left', `${x}px`); } // A function to set the x position of the block

    const animationStarted = performance.now(); // Mark when the animation started

    step(); // Run the first frame of the animation

    function step() {
        const elapsed = performance.now() - animationStarted; // Get time  difference between now and animationStarted)
        const pctElapsed = easeOutBounce(elapsed / duration);                // number from 0 (just started) to 1 (complete)
        const position = pctElapsed;                          // assign the position to be a number between 0 and 1

        const newX = startX + position * (endX - startX);    // the new position
        setX(newX);                                          // update our block's location

        if(elapsed < duration) { requestAnimationFrame(step); } // If we haven't finished the animation, run another step
        else { setTimeout(() => setX(0), 1000); } // Reset the animation location after one second
    }
}

// credit: https://easings.net/#easeOutBounce
// note: you should **not** try to read/interpret this function. Just take it as-is
// (or read the description at https://observablehq.com/@soney/si-579-animation#cell-390)
function easeOutBounce(x) { // x is a number between 0 and 1
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}

export function Problem () {
    const blockRef = useRef();
    return <>
        <div id="troph">
            <div id="block" ref={blockRef}></div>
        </div>
        <button className="btn btn-success" onClick={() => startAnimation(blockRef.current)}>Start</button>
    </>
}