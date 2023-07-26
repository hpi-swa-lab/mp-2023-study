
let server = "http://127.0.0.1:5000/status";
let serverResponse = "http://127.0.0.1:5000/response";
class Connection {
    
    async poll() {
        const response = await fetch(server, {
            method: "GET",
            mode: "cors"
        })
        const state = await response.json();
        this.updateState(state);
    }

    currentState = {
        view: "None",
        stateId: -1
    }

    updateState(state) {
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
        setTimeout(this.poll(), 100);
    }

    reportSurvey(event, extra) {
        let data = { view: this.currentState.view };
        data[event] = extra;
        this.report(data);
        setTimeout(this.poll(), 100);
    }


    stopped = false;
    loop() {
        if (!this.stopped) {
            this.poll();

            setTimeout(() => this.loop(), 2000);
        }
    }

    stop() {
        this.stopped = true;
    }
}

window.connection = new Connection();
window.connection.loop();
window.reportSurvey = (...args) => window.connection.reportSurvey(...args);