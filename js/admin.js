
function initUI() {
    document.getElementById("increment-stateid-button").onclick = () => window.connection.forceNext();
    document.getElementById("set-stateid-button").onclick = () => {
        let nextStateId = Number(document.getElementById("stateid-input").value);
        window.connection.setStateId(nextStateId);
    }

}

function updateUI(state) {
    document.getElementById("current-state").innerHTML = JSON.stringify(state);
}

initUI();
window.updateUIForState = (state) => updateUI(state);