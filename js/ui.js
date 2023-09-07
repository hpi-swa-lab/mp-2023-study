

function createInformationContainer(information) {
    let div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("information-bit");
    let informationP = document.createElement("p");
    informationP.classList.add("prevent-select");
    informationP.innerText = information;
    div.appendChild(informationP);
    return div;
}

let statements = [];

function buildTask(stmts, toProof, arrangeable) {
    document.getElementById("study-part-pc").classList.remove("hidden");
    document.getElementById("information-container-1").classList.add("hidden");
    document.getElementById("statement").classList.add("hidden");
    document.getElementById("check-answer-button").classList.add("hidden");
    document.getElementById("answer-feedback").innerHTML = "&zwnj;";
    document.getElementById("check-answer-button").disabled = false;
    statements = stmts;

    let informationContainer1 = document.getElementById("information-container-1");
    informationContainer1.innerHTML = "";

    let columnHeight = 7;
    let elementHeight = 70;

    statements.forEach((statementSpec, index) => {
        let informationBit = statementSpec.text;
        statementSpec.index = index; // Write index here to match correct answers later.
        let container = createInformationContainer(informationBit);

        dragElement(container, arrangeable);

        informationContainer1.appendChild(container);
        if (index + 1 < columnHeight) {
            container.style.left = 10 + 'px';
            container.style.top = index * elementHeight + 'px';
            container.setAttribute("statement-group", 1);
        } else {
            container.style.left = 400 + 'px';
            container.style.top = (index + 1 - columnHeight) * elementHeight + 'px';
            container.setAttribute("statement-group", 2);
        }

        container.setAttribute('statement-index', index);

    })
    document.getElementById("statement").innerHTML = toProof;
    document.getElementById("start-study-button").onclick = startStudy
    document.querySelectorAll("input").forEach(input => input.onclick = endStudy)
    document.getElementById("check-answer-button").onclick = checkAnswers;
}

let taskStartTime = 0;



function startStudy() {
    document.getElementById("information-container-1").classList.remove("hidden");
    document.getElementById("statement").classList.remove("hidden");
    document.getElementById("check-answer-button").classList.remove("hidden");
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

function getElementsInSameGroup(element) {
    let group = element.getAttribute("statement-group");
    return [...document.querySelectorAll(`[statement-group="${group}"]`)];
}

let zIndexCounter = 1;

// https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt, individuallyArrangable) {
    var xOffset = 0, yOffset = 0, initialX = 0, initialY = 0;
    var onclickBackup = elmnt.onclick;
    elmnt.onmousedown = dragMouseDown;
    elmnt.onclick = null;

    var originalTop = 0;
    var originalLeft = 0;

    var sameGroupElements = [];


    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        document.dragOngoing = true;
        originalTop = elmnt.offsetTop;
        originalLeft = elmnt.offsetLeft;
        elmnt.style.zIndex = zIndexCounter++;
        sameGroupElements = getElementsInSameGroup(elmnt);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        xOffset = initialX - e.clientX;
        yOffset = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        // set the element's new position:
        if (individuallyArrangable) {
            elmnt.style.top = (elmnt.offsetTop - yOffset) + "px";
            elmnt.style.left = (elmnt.offsetLeft - xOffset) + "px";
        } else {
            sameGroupElements.forEach(e => {
                e.style.top = (e.offsetTop - yOffset) + "px";
                e.style.left = (e.offsetLeft - xOffset) + "px";
            })
        }

    }

    function closeDragElement(e) {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        document.dragOngoing = false;
        e.preventDefault();
        elmnt.onclick = onclickBackup;

        if (elmnt.offsetTop == originalTop && elmnt.offsetLeft == originalLeft) {
            // No drag has happened
            elmnt.classList.contains("selected") ? elmnt.classList.remove("selected") : elmnt.classList.add("selected")
        }
    }
}

function getSelectedAnswersIndices() {
    let selectedStatements = [...document.querySelectorAll(".selected")];
    return selectedStatements.map(node => node.getAttribute("statement-index"));
}

function getCorrectAnswerIndices() {
    return statements.filter(stmt => stmt.correct).map(stmt => stmt.index);
}

function arraysHaveSameElements(a1, a2) {
    return a1.sort().join(',') === a2.sort().join(',');
}

function checkAnswers() {
    let selectedStatements = getSelectedAnswersIndices();
    let answerFeedback = document.getElementById("answer-feedback");
    if (arraysHaveSameElements(selectedStatements, getCorrectAnswerIndices())) {
        // End this study part.
        let taskEndTime = Date.now();
        let duration = taskEndTime - taskStartTime;
        answerFeedback.innerText = "Die Auswahl ist korrekt.";
        answerFeedback.classList.add("animate-green")
        setTimeout(() => answerFeedback.classList.remove("animate-green"), 700)
        document.getElementById("check-answer-button").disabled = true;
        window.connection.finishTask(duration);
    } else {
        answerFeedback.innerText = "Die Auswahl ist nicht korrekt.";
        answerFeedback.classList.add("animate-red")
        setTimeout(() => answerFeedback.classList.remove("animate-red"), 700)
    }
}

function addSurvey(view) {
    let d = document.createElement("div");
    d.id = view;
    d.classList.add("react-imported-div")
    document.getElementById("react-anchor").appendChild(d);
}

function addVRHint() {
    document.getElementById("vr-hint").innerHTML = "<h1>Der nächste Part der Studie findet in VR statt.</h1>";
}

function addDoneHint() {
    document.getElementById("vr-hint").innerHTML = "<h1>Danke für die Mitwirkung!</h1>";
}

function updateUIForState(state) {
    document.getElementsByClassName("react-imported-div")[0]?.remove();
    document.getElementById("vr-hint").innerHTML = "";
    document.getElementById("study-part-pc").classList.add("hidden");
    if (state.view.startsWith("Desktop")) {
        buildTask(state.statements, state.toProof, state.arrangeable)
    } else if (state.view == "demographics" || state.view == "tlx") {
        addSurvey(state.view);
    } else if (state.view.startsWith("VR")) {
        addVRHint();
    } else if (state.view == "done") {
        addDoneHint();
    }

}

window.updateUIForState = updateUIForState
