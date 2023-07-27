from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
from latinsquare import balancedLatinSquare
from statement import *


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

conditions = [Condition.DesktopNoDecomp, Condition.DesktopDecomp,
              Condition.VRDecomp, Condition.VRNoDecomp]

tasks_per_condition = int(len(statementsMatrix[0]) / len(conditions))

participantId = int(input("participantId (integer only): "))
stateId = 0
state = None
leftHand = False
height = 175


@app.route("/status")
@cross_origin()
def get_state():
    global state

    experiment_conditions: list[Condition] = balancedLatinSquare(
        conditions, participantId % len(conditions))
    print(json.dumps(experiment_conditions))

    views = [
        Survey.DEMOGRAPHICS,
        [[c, c, c, c, Survey.TLX] for c in experiment_conditions],
        Survey.DONE
    ]
    views: List[Survey | Condition] = list(flatten(views))

    if stateId >= len(views):
        return "finished. Restart sever with new participantId to start again.", 400

    view = views[stateId]

    if view == Survey.DEMOGRAPHICS or view == Survey.TLX or view == Survey.DONE:
        state = State(
            view=view,
            stateId=stateId,
            toProof="",
            statements=[],
            arrangeable=False,
            leftHand=leftHand,
            height=0,
            _views=views,
            _conditions=experiment_conditions
        )
        return state.as_json()

    if views.index(view) == stateId:
        toProof, statements = get_tutorial_statements()
        state = State(
            view=view,
            stateId=stateId,
            toProof=toProof,
            statements=statements,
            arrangeable=view in [Condition.DesktopDecomp, Condition.VRDecomp],
            leftHand=leftHand,
            height=height,
            _views=views,
            _conditions=experiment_conditions
        )
        return state.as_json()

    only_conditions = [c for c in views[0:(stateId+1)] if c in conditions]
    # remove tutorial conditions
    only_conditions = [c for i, c in enumerate(
        only_conditions) if only_conditions.index(c) != i]
    task_index = len(only_conditions) - 1

    (toProof, statements) = get_statements(
        *[statementsMatrix[n][task_index] for n in range(len(statementsMatrix))])

    state = State(
        view=view,
        stateId=stateId,
        toProof=toProof,
        statements=statements,
        arrangeable=view in [Condition.DesktopDecomp, Condition.VRDecomp],
        leftHand=leftHand,
        height=height,
        _views=views,
        _conditions=experiment_conditions
    )
    return state.as_json()


@app.route("/response",  methods=['POST'])
@cross_origin()
def post_response():
    global stateId, state, participantId, leftHand, height

    if state == None:
        return "state is NONE. Please call GET /status request first", 400

    if "stateId" in request.json and stateId != request.json["stateId"]:
        return "stateId mismatch. This is probably caused by repeated POST /response without an update in the frontend ui", 400

    if "view" in request.json and request.json["view"] == Survey.DEMOGRAPHICS:
        leftHand = request.json["demographics"]["values"]["handedness"] == "left-handed"
        height = int(request.json["demographics"]["values"]["height"])

    path = f"responses/{participantId}-{stateId}"
    try:
        with open(f"{path}.json", 'x') as outfile:
            json.dump({
                "task": state.as_dict(),
                "response": request.json
            }, outfile, indent=4, ensure_ascii=False)
    except Exception as e:
        print("file already existed, fallback to -REPEATED file")
        with open(f"{path}-REPEATED.json", 'w+') as outfile:
            json.dump({
                "task": state.as_dict(),
                "response": request.json
            }, outfile, indent=4, ensure_ascii=False)

    stateId += 1
    return "OK"


@app.route("/forceNext",  methods=['POST'])
@cross_origin()
def force_next():
    global stateId
    stateId += 1
    return "OK"


@app.route("/setStateId",  methods=['POST'])
@cross_origin()
def setStateId():
    global stateId
    stateId = int(request.json["stateId"])
    return "OK"
