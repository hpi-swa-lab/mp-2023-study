from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


state = {
        "view": "TLX", # possible values: "PC", "VR", "Demographics", "TLX"
        "stateId": 2,
        "toProof": "Beweise: Alle Weintrinker sind rothaarig",
        "statements": [
        {
            "text": "alle Weintrinker sind 20 Jahre alt",
            "correct": False
        },
        {
            "text": "alle Weintrinker sind irisch",
            "correct": True
        },
        {
            "text": "alle Weintrinker wohnen in potsdam",
            "correct": True
        },
        {
            "text": "alle potsdamer sind klein",
            "correct": True
        },
        {
            "text": "alle iren haben große füße",
            "correct": True
        },
        {
            "text": "alle potsdamer, die große füße haben, sind abenteuerlustig",
            "correct": True
        },
        {
            "text": "alle potsdamer, die große füße haben und drei füße haben, sind irisch",
            "correct": False
        },
        {
            "text": "alle iren sind reich",
            "correct": False
        },
        {
            "text": "alle abenteuerlustigen, die medizin studieren, sind rothaarig",
            "correct": False
        },
        {
            "text": "alle münsteraner studieren medizin",
            "correct": False
        },
        {
            "text": "alle briten sind münsteraner",
            "correct": False
        },
        {
            "text": "alle abenteuerlustigen, die klein sind, sind rothaarig",
            "correct": True
        }
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
    print(response)
    return "OK"