
let server = "http://127.0.0.1:5000/status";
let serverResponse = "http://127.0.0.1:5000/response";
class Connection {
    poll() {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", server, true);
        httpRequest.onload = () => {
            this.updateState(httpRequest.response);
        };
        httpRequest.send();
        httpRequest.onerror = (e) => {
            console.error(e);
        }
    }

    currentState = {
        view: "None",
        stateId: -1
    }

    updateState(stateJson) {
        let state = JSON.parse(stateJson);
        if (state.stateId == this.currentState.stateId) return;
        window.updateUIForState(state);
        this.currentState.view = state.view;
        this.currentState.stateId = state.stateId;
    }

    report(data) {
        data.stateId = this.currentState.stateId;
        fetch(serverResponse, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
    }

    finishTask(duration) {
        this.report({ view: this.currentState.view, duration })
    }

    reportSurvey(event, extra) {
        let data = { view: this.currentState.view };
        data[event] = extra;
        this.report(data)
    }


    stopped = false;
    loop() {
        if (!this.stopped) {
            this.poll();

            setTimeout(() => this.loop(), 5000);
        }
    }

    stop() {
        this.stopped = true;
    }
}

window.connection = new Connection();
window.connection.loop();
window.reportSurvey = (...args) => window.connection.reportSurvey(...args);