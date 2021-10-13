const clickCountButton = document.querySelector('#problem-3 #click-count');

// write your code here
var clickTimes = 0;
clickCountButton.addEventListener("click", () => {
    clickTimes ++;
    let endings = (clickTimes === 1) ? "" : "s";
    clickCountButton.textContent = "You clicked the button " + clickTimes + " time" + endings;
});
