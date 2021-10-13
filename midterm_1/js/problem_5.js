const wordInput = document.querySelector('#problem-5 #rhyme-with-input');
const showRhymesButton = document.querySelector('#problem-5 #show-rhymes-button');
const clearButton = document.querySelector('#problem-5 #clear-rhymes-button');
const rhymesOutput = document.querySelector('#problem-5 #rhymes');

function getRhymes(rel_rhy, callback) {
    fetch(`https://api.datamuse.com/words?${(new URLSearchParams({rel_rhy})).toString()}`)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        }, (err) => {
            console.error(err);
        });
}

// Write your code here

function addWordToList (word) {
    let localLi = document.createElement('li');
    localLi.classList.add('list-group-item');
    localLi.textContent = word;
    rhymesOutput.append(localLi);
}

function printRhymes(results) {
    if (checkEmpty(results)) {
        addWordToList('(no rhymes)');
    }
    else {
        for (let idx in results) {
            let result = results[idx];
            addWordToList(result.word);
        }
    }
}

function clearRhymes() {
    const rhymesChildNode = rhymesOutput.childNodes;
    while (rhymesChildNode.length > 0) {
        rhymesOutput.removeChild(rhymesChildNode[0]);
    }
}

function checkEmpty(results) {
    return results.length === 0;
}

clearButton.addEventListener('click', () => {
    wordInput.value = '';
    clearRhymes();
});

showRhymesButton.addEventListener('click', () => {
    let word = wordInput.value;
    getRhymes(word, (results) => {
        clearRhymes();
        printRhymes(results);
    });
});
