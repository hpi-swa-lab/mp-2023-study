
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
        platform: "PC",
        stateId: 0
    }

    updateState(stateJson) {
        let state = JSON.parse(stateJson);
        if (state.stateId == this.currentState.stateId && !(state.forceRestart)) return;
        if (state.platform == "VR") return;
        if (state.platform == "PC" || state.platform == "Survey") {
            window.updateUIForState(state);
            this.currentState.stateId = state.stateId;
        }
    }

    finishStudy(duration) {
        fetch(serverResponse, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                stateId: this.currentState.stateId,
                duration
            })
        })
    }

    reportSurvey(event, extra) {
        console.log(event);
        console.log(extra);
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
window.reportSurvey = window.connection.reportSurvey;