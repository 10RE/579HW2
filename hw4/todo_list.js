function removeTask(obj) {
    
}

function addTask (description, dueTime = false) {
    list = document.getElementById("task_list");
    let taskItem = document.createElement("li");
    let taskDue = document.createElement("span");
    let taskButton = document.createElement("button");
    taskDue.classList.add("due");
    if (dueTime) {
        //taskDue.textContent = "due " + timestampeTodateAndTime(dueTime);
        console.log(new Date(dueTime).getHours());
        taskDue.textContent = "due " + new Date(dueTime).toLocaleString();
    }
    taskButton.classList.add("btn", "btn-sm", "btn-outline-danger", "done")
    taskButton.setAttribute("type", "button");
    //taskButton.setAttribute("onclick", "removeTask(this)");
    taskButton.addEventListener("click", () => {
        taskButton.parentNode.remove();
    });
    taskButton.textContent = "Done";
    taskItem.textContent = description;
    taskItem.appendChild(taskDue);
    taskItem.appendChild(taskButton);
    list.appendChild(taskItem);
}

/*
function timestampeTodateAndTime(timestamp) {
    dueObj = new Date(timestamp);
    let hours = dueObj.getHours();
    let noonIndicator = "AM";
    if (hours > 12) {
        hours = hours - 12;
        noonIndicator = "PM";
    }
    else if (hours === 12) {
        noonIndicator = "PM";
    }
    else if (hours === 0) {
        hours = 12;
    }
    return (dueObj.getMonth() + 1) + "/" + dueObj.getDate() + "/" + dueObj.getFullYear() + " " + hours + ":" + dueObj.getMinutes() + ":" + dueObj.getSeconds() + " " + noonIndicator;
}
*/

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

function doTask() {
    let description = document.getElementById("task_description_input").value;
    let dueDateIn = document.getElementById("duedate_input");
    let dueTimeIn = document.getElementById("duetime_input");
    let dueTime = dateAndTimeToTimestamp(dueDateIn, dueTimeIn);
    addTask(description, dueTime);
    document.getElementById("task_description_input").value = "";
}

let addTaskButton = document.getElementById("add_task");
addTaskButton.addEventListener("click", () => {
    doTask();
});
document.addEventListener("keydown", function (obj) {
    if (obj.key === "Enter"){
        doTask();        
    }
});
