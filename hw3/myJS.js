/*
* Excercise 1
*
*/

var colorFlag = false;
const colorBlock = document.getElementById("color-block");
colorBlock.addEventListener("click", changeColor);

/*
* Then write a function that changes the text and the color inside the div
*
*/

function changeColor(){
    const colorBlock = document.getElementById("color-block");
    const colorText = document.getElementById("color-name");
    //Write a condition determine what color it should be changed to
    if(colorFlag){
        //change the background color using JS
        colorBlock.style.backgroundColor = "#F08080";
        //Change the text of the color using the span id color-name
        colorText.textContent = "#F08080";
    }
    else{
        //change the background color using JS
        colorBlock.style.backgroundColor = "#8080F0";
        //Change the text of the color using the span id color-name
        colorText.textContent = "#8080F0";
    }
    colorFlag = !colorFlag;
}


/*
* For excercise 2, you need to write an event handler for the button id "convertbtn"
* on mouse click. For best practice use addEventListener.
*
*/

const F2CButton = document.getElementById("convertbtn");
F2CButton.addEventListener("click", convertTemp);

/*
* Then write a function that calculates Fahrenheit to Celsius and display it on the webpage
*
*/

function convertTemp(){
    const tempOut = document.getElementById("c-output");
    const tempIn = document.getElementById("f-input");
    console.log(parseFloat(tempIn.value));
    if (isNaN(parseFloat(tempIn.value))) {
        tempOut.textContent = "Not a number";
    }
    else {
        //Calculate the temperature here
        let temp = (Number(tempIn.value) - 32) * 5 / 9; 
        //Send the calculated temperature to HTML
        tempOut.textContent = temp.toFixed(2);
    }
}


