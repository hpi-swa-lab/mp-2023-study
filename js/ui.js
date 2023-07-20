

function createInformationContainer(information, draggable) {
    let div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("information-bit");
    let informationP = document.createElement("p");
    informationP.classList.add("prevent-select");
    informationP.innerText = information;
    div.appendChild(informationP);
    if(!draggable){
    div.onmouseup = () => {  div.classList.contains("selected") ? div.classList.remove("selected") : div.classList.add("selected") }
    }
    return div;
}

let correctSelection = [];

function buildTask(statements, toProof, correctSelect, arrangeable) {
    document.getElementById("study-part-pc").classList.remove("hidden")
    correctSelection = correctSelect;

    let informationContainer1 = document.getElementById("information-container-1");
    /*Sortable.create(informationContainer1, {sort: isSortable, animation: 100,
        ghostClass: 'blue-background-class'});
    Sortable.create(informationContainer2, {sort: isSortable, animation: 100,
        ghostClass: 'blue-background-class'});*/

    let columnHeight = 8;
    statements.forEach((informationBit, index) => {
        let container = createInformationContainer(informationBit, arrangeable);
        if(arrangeable) {
        dragElement(container);
        }
        informationContainer1.appendChild(container);
        if(index + 1 < columnHeight) {
            container.style.left = 10 + 'px';
            container.style.top = index * 50 + 'px';
        } else {
            container.style.left = 420 + 'px';
            container.style.top = (index + 1 - columnHeight) * 50 + 'px';
        }
        
        container.setAttribute('statement-index', index);
        
    })
    /*
    statements[1].forEach((informationBit, index) => {
        let container = createInformationContainer(informationBit);
        dragElement(container);
        informationContainer2.appendChild(container);
        container.style.top = index * 50 + 'px';
    })*/
    document.getElementById("statement").innerHTML = toProof;
    document.getElementById("start-study-button").onclick = startStudy
    document.querySelectorAll("input").forEach(input => input.onclick = endStudy)
    document.getElementById("check-answer-button").onclick = checkAnswers;
}

let taskStartTime = 0;



function startStudy() {
    document.getElementById("information-container-1").classList.remove("hidden");
    document.getElementById("statement").classList.remove("hidden");
    document.getElementById("answer").classList.remove("hidden");
    taskStartTime = Date.now();
}

function endStudy() {
    let taskEndTime = Date.now();
    document.getElementById("time").innerText = `${taskEndTime - taskStartTime} ms`
    let form = document.getElementById("answer-form");
    let result = `'${statement}',${taskStartTime},${taskEndTime - taskStartTime},${form.answer.value},${isSortable}`;
    console.log("statement,starttime,duration,answer,sortable")
    console.log(result);
}

// https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var onclickBackup = elmnt.onclick;
    elmnt.onmousedown = dragMouseDown;
    elmnt.onclick = null;

    var originalTop = 0;
    var originalLeft = 0;


    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        document.dragOngoing = true;
        originalTop = elmnt.offsetTop;
        originalLeft = elmnt.offsetLeft;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement(e) {
        console.log("on mouse up")
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        document.dragOngoing = false;
        e.preventDefault();
        elmnt.onclick = onclickBackup;

        console.log(`
        offset top ${elmnt.offsetTop},
        original Top ${originalTop},
        offset left ${elmnt.offsetLeft},
        original left ${originalLeft}`)
        if( elmnt.offsetTop == originalTop &&  elmnt.offsetLeft == originalLeft) {
            console.log("No drag")
            // No drag has happened
            elmnt.classList.contains("selected") ? elmnt.classList.remove("selected") : elmnt.classList.add("selected")
        }
    }
}

function getSelectedAnswersSet() {
    let selectedStatements = [... document.querySelectorAll(".selected")];
    return selectedStatements.map(node => node.getAttribute("statement-index"));
}

function arraysHaveSameElements(a1,a2) {
    return a1.sort().join(',')=== a2.sort().join(',');
}

function checkAnswers() {
    let selectedStatements = getSelectedAnswersSet();
    let answerFeedback = document.getElementById("answer-feedback")
    if(arraysHaveSameElements(selectedStatements, correctSelection)) {
        // End this study part.
        let taskEndTime = Date.now();
        let duration = taskEndTime - taskStartTime;
        answerFeedback.innerText = "Die Auswahl ist korrekt.";
        window.connection.finishTask(duration);
    } else {
        answerFeedback.innerText = "Die Auswahl ist nicht korrekt.";
    }
}

function addSurvey(surveyId) {
    let d = document.createElement("div");
    d.id = surveyId;
    d.classList.add("react-imported-div")
    document.body.appendChild(d);
}

function updateUIForState(state) {
    document.getElementsByClassName("react-imported-div")[0]?.remove();
    if (state.platform == "PC") {
        
        buildTask(state.statements, state.toProof, state.correctSelection, state.arrangeable)
    } else if  (state.platform = "Survey") {
        document.getElementById("study-part-pc").classList.add("hidden")
        addSurvey(state.surveyId);
    }
    
}

window.updateUIForState = updateUIForState
