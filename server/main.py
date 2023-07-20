from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


state = {
        "platform": "PC",
        "surveyId": "demographics",
        "stateId": 2,
        "toProof": "Beweise: Alle Weintrinker sind rothaarig",
        "statements": [
            "alle Weintrinker sind 20 Jahre alt",
            "alle Weintrinker sind irisch",
            "alle Weintrinker wohnen in potsdam",
            "alle potsdamer sind klein",
            "alle iren haben große füße",
            "alle potsdamer, die große füße haben, sind abenteuerlustig",
            "alle potsdamer, die große füße haben und drei füße haben, sind irisch",
            "alle iren sind reich",
            "alle abenteuerlustigen, die medizin studieren, sind rothaarig",
            "alle münsteraner studieren medizin",
            "alle briten sind münsteraner",
            "alle abenteuerlustigen, die klein sind, sind rothaarig",
        ],
        "correctSelection" : [1,2,3,4,5,11],
        "arrangeable": True,
        "forceRestart": False
    }

@app.route("/status")
@cross_origin()
def get_state():
    return state

@app.route("/response",  methods=['POST'])
@cross_origin()
def post_response():
    response = request.json
    pass
    print(response)
    return "OK"