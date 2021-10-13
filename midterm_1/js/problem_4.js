const messageInput = document.querySelector('#problem-4 #message-input');
const messageFeedback = document.querySelector('#problem-4 #message-feedback')

const MAX_CHARACTERS = 50;

// Write your code here

function removeValid() {
    messageInput.classList.remove('is-valid');
    messageInput.classList.remove('is-invalid');
    messageFeedback.classList.remove('valid-feedback');
    messageFeedback.classList.remove('invalid-feedback');
}

function checkInput() {
    removeValid();
    if (messageInput.value.length > MAX_CHARACTERS) {
        messageInput.classList.add('is-invalid');
        messageFeedback.classList.add('invalid-feedback');
    }
    else{
        messageInput.classList.add('is-valid');
        messageFeedback.classList.add('valid-feedback');
    }
}

function printInputLength() {
    let inputLength = messageInput.value.length;

    if (inputLength > MAX_CHARACTERS) {
        let diff = inputLength - MAX_CHARACTERS;
        messageFeedback.textContent = diff + ' character' + addS(diff) + ' too long';
    }
    else {
        let diff = MAX_CHARACTERS - inputLength;
        messageFeedback.textContent = diff + ' character' + addS(diff) + ' left';
    }
}

checkInput();
printInputLength();

messageInput.addEventListener('input', () => {
    //console.log(messageInput.value.length);
    checkInput();
    printInputLength();
})