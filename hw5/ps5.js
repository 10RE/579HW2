/**
 * Returns a list of objects grouped by some property. For example:
 * groupBy([{name: 'Steve', team:'blue'}, {name: 'Jack', team: 'red'}, {name: 'Carol', team: 'blue'}], 'team')
 * 
 * returns:
 * { 'blue': [{name: 'Steve', team: 'blue'}, {name: 'Carol', team: 'blue'}],
 *    'red': [{name: 'Jack', team: 'red'}]
 * }
 * 
 * @param {any[]} objects: An array of objects
 * @param {string|Function} property: A property to group objects by
 * @returns  An object where the keys representing group names and the values are the items in objects that are in that group
 */
 function groupBy(objects, property) {
    // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
    // value for property (obj[property])
    if(typeof property !== 'function') {
        const propName = property;
        property = (obj) => obj[propName];
    }

    const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
    for(const object of objects) {
        const groupName = property(object);
        //Make sure that the group exists
        if(!groupedObjects.has(groupName)) {
            groupedObjects.set(groupName, []);
        }
        groupedObjects.get(groupName).push(object);
    }

    // Create an object with the results. Sort the keys so that they are in a sensible "order"
    const result = {};
    for(const key of Array.from(groupedObjects.keys()).sort()) {
        result[key] = groupedObjects.get(key);
    }
    return result;
}

const wordInput = document.querySelector('#word_input');
const showRhymesButton = document.querySelector('#show_rhymes');
const showSynButton = document.querySelector('#show_synonyms');
/*const clearButton = document.querySelector('#problem-5 #clear-rhymes-button');*/
const listOutput = document.querySelector('#word_output');
const titleLine = document.querySelector('#output_description');
const savedWordsLine = document.querySelector('#saved_words');
var savedWords = [];
var word = '';

function getRhymes(rel_rhy, callback) {
    console.log(`https://api.datamuse.com/words?${(new URLSearchParams({rel_rhy})).toString()}`);
    fetch(`https://api.datamuse.com/words?${(new URLSearchParams({rel_rhy})).toString()}`)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        }, (err) => {
            console.error(err);
        });
}

function getSynoyms(ml, callback) {
    console.log(`https://api.datamuse.com/words?${(new URLSearchParams({ml})).toString()}`);
    //fetch(`https://api.datamuse.com/words?${(new URLSearchParams({ml})).toString()}`)
    fetch(`https://api.datamuse.com/words?ml=ringing+in+the+ears`)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        }, (err) => {
            console.error(err);
        });
}

function updateSavedWordsLine() {
    savedWordsLine.textContent = "";
    for (const savedWord of savedWords){
        savedWordsLine.textContent += (savedWord + ", ");
    }
    let lineLen = savedWordsLine.textContent.length -2;
    savedWordsLine.textContent = savedWordsLine.textContent.substring(0, lineLen);
}

function saveWord (word) {
    savedWords.push(word);
    savedWords = Array.from(new Set(savedWords));
    updateSavedWordsLine();
}

function addWordToList (word, target) {
    let localLi = document.createElement('li');
    
    //localLi.classList.add('col');
    //localLi.id = "word_output";
    localLi.textContent = word + "  ";
    localLi.style = "padding: 5px 0";
    let saveBtn = document.createElement('button');
    saveBtn.classList.add("btn", "btn-sm", "btn-outline-success", "saveBtn");
    saveBtn.id = "saveBtn";
    saveBtn.addEventListener('click', () => {
        saveWord(word);
    });
    saveBtn.textContent = "save";
    localLi.append(saveBtn);
    target.append(localLi);
}

function printRhymes(results) {
    titleLine.textContent = "Words that rhyme with " + word;
    if (checkEmpty(results)) {
        addWordToList('(no rhymes)', listOutput);
    }
    else {
        let tmp_rlt = groupBy(results, 'numSyllables');
        console.log(tmp_rlt);
        for (let syl_idx in tmp_rlt) {
            let localTitleNode = document.createElement('div');
            localTitleNode.style = "font-size: 20px";
            localTitleNode.textContent = syl_idx + ' syllable' + (syl_idx === 1 ? '':'s') + " :";
            listOutput.append(localTitleNode);
            let localListNode = document.createElement('ul');
            for (let idx in tmp_rlt[syl_idx]) {
                let result = tmp_rlt[syl_idx][idx];
                addWordToList(result.word, localListNode);
            }
            listOutput.append(localListNode);
        }
        /*
        for (let idx in results) {
            let result = results[idx];
            addWordToList(result.word);
        }
        */
    }
}

function printSynoyms(results) {
    titleLine.textContent = "Words with a similar meaning to " + word;
    if (checkEmpty(results)) {
        addWordToList('(no Synoyms)', listOutput);
    }
    else {
        for (let idx in results) {
            let result = results[idx];
            addWordToList(result.word);
        }
    }
}

function clearList() {
    const listChildNode = listOutput.childNodes;
    while (listChildNode.length > 0) {
        listOutput.removeChild(listChildNode[0]);
    }
}

function checkEmpty(results) {
    return results.length === 0;
}

/*
clearButton.addEventListener('click', () => {
    wordInput.value = '';
    clearRhymes();
});
*/

showRhymesButton.addEventListener('click', () => {
    word = wordInput.value;
    titleLine.textContent = "...loading";
    getRhymes(word, (results) => {
        clearList();
        console.log(results);
        printRhymes(results);
    });
});

showSynButton.addEventListener('click', () => {
    word = wordInput.value;
    titleLine.textContent = "...loading";
    getSynoyms(word, (results) => {
        clearList();
        console.log(results);
        printSynoyms(results);
    });
});

