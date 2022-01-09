import { useState, createRef } from "react";

function RhymeFinder (props) {
    let uid = 0;
    const wordInputRef = createRef();
    const [items, setItems] = useState([]);
    const [titleLine, setTitleLine] = useState("");
    const [savedWords, setSavedWords] = useState([]);
    

    /* 
    * 
    * Functions
    *  
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

    function getRhymes(rel_rhy, callback) {
        fetch(`https://api.datamuse.com/words?${(new URLSearchParams({rel_rhy})).toString()}`)
            .then((response) => response.json())
            .then((data) => {
                callback(data);
            }, (err) => {
                console.error(err);
            });
    }

    function addRhymes(results, word) {
        if (results.length === 0) {
            setTitleLine("No result");
            setItems([]);
            return;
        }
        setTitleLine("Words that rhyme with " + word);
        let local_array = [];
        let tmp_rlt = groupBy(results, 'numSyllables');
        for (let syl_idx in tmp_rlt) {
            for (let idx in tmp_rlt[syl_idx]) {
                const newItem = {
                    text: tmp_rlt[syl_idx][idx].word,
                    syl: syl_idx,
                    type: "Rhymes",
                    id: uid++
                };
                local_array.push(newItem);
            }
        }
        
        setItems(local_array);
    }

    function getSynoyms(ml, callback) {
        fetch(`https://api.datamuse.com/words?${(new URLSearchParams({ml})).toString()}`)
            .then((response) => response.json())
            .then((data) => {
                callback(data);
            }, (err) => {
                console.error(err);
            });
    }

    function addSynoyms(results, word) {
        if (results.length === 0) {
            setTitleLine("No result");
            setItems([]);
            return;
        }
        setTitleLine("Words with a similar meaning to " + word);
        let local_array = [];
        for (let result of results) {
            const newItem = {
                text: result.word,
                type: "Synoyms",
                id: uid++
            };
            local_array.push(newItem);
        }
        
        setItems(local_array);
    }

    function onFindRhymes () {
        let word = wordInputRef.current.value;
        setTitleLine("...loading");
        getRhymes(word, (results) => {
            addRhymes(results, word);
        });
    }

    function onFindSynoyms () {
        let word = wordInputRef.current.value;
        setTitleLine("...loading");
        getSynoyms(word, (results) => {
            addSynoyms(results, word);
        });
    }


    /* 
    * 
    * Components
    *  
    */

    function Item (props) {
        function saveItem() {
            let newSavedWords;
            newSavedWords = savedWords.concat(props.text + ", ");
            setSavedWords(Array.from(new Set(newSavedWords)));
        }
        return <li>{props.text} <button onClick={saveItem}>save</button></li>;
    }

    function SavedWords () {
        let prevones = savedWords.slice(0, -1);
        let lastone = "";
        if (savedWords.length !== 0) {
            let localString = savedWords[savedWords.length - 1]
            lastone = localString.substring(0, localString.length - 2);
        }
        prevones = prevones.concat(lastone);
        return <div class="col">Saved words: <span>{prevones}</span></div>
    }

    function TextBar () {
        return <>
            <input class="form-control" type="text" placeholder="Enter a word" id="word_input" ref={wordInputRef} />
        </>;
    }

    function TextDisplay () {
        return <p>{titleLine}</p>;
    }

    function ListDisplay () {
        let ret = [];
        let prevIdx = 0;
        const sylTitleStyle = {
            "font-size": "20px",
            "margin": "10px 0",
            "font-weight": "bold"
        }
        for (let item of items) {
            if (item.type === "Rhymes" && item.syl !== prevIdx) {
                prevIdx = item.syl;
                ret.push(<>
                    <div style={sylTitleStyle}> {item.syl} syllable{item.syl==="1"?"":"s"} </div>
                    <Item key={item.id} text={item.text} />
                </>);
            }
            else {
                ret.push(<Item key={item.id} text={item.text} />);
            }
        }
        return <ul>{ret}</ul>;
    }

    return <>
        <SavedWords />
        <TextBar />
        <button id="show_rhymes" type="button" class="btn btn-primary" onClick={onFindRhymes}>Show rhyming words</button>
        <button id="show_synonyms" type="button" class="btn btn-secondary" onClick={onFindSynoyms}>Show synonyms</button>
        <TextDisplay />
        <ListDisplay />
    </>;


}

export default RhymeFinder;