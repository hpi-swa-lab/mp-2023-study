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


@app.route("/status")
@cross_origin()
def get_state():
    global state

    experiment_conditions: list[Condition] = balancedLatinSquare(
        conditions, participantId % len(conditions))

    views = [
        SurveyId.DEMOGRAPHICS,
        [[c, c, c, SurveyId.TLX] for c in experiment_conditions]
    ]
    views = list(flatten(views))

    if stateId >= len(views):
        raise Exception(
            "finished. Restart sever with new participantId to start again.")

    view = views[stateId]

    if view == SurveyId.DEMOGRAPHICS:
        state = State(
            view=view,
            stateId=stateId,
            toProof="",
            statements=[],
            arrangeable=False,
            leftHand=leftHand,
        )
        return state.as_json()

    if view == SurveyId.TLX:
        state = State(
            view=view,
            stateId=stateId,
            toProof="",
            statements=[],
            arrangeable=False,
            leftHand=leftHand,
        )
        return state.as_json()

    only_conditions = [c for c in views[0:(stateId+1)] if c in conditions]
    task_index = len(only_conditions) - 1

    (toProof, statements) = get_statements(
        *[statementsMatrix[n][task_index] for n in range(len(statementsMatrix))])

    state = State(
        view=view,
        stateId=stateId,
        toProof=toProof,
        statements=statements,
        arrangeable=True if view in [
            Condition.DesktopDecomp, Condition.VRDecomp] else False,
        leftHand=leftHand
    )
    return state.as_json()


@app.route("/response",  methods=['POST'])
@cross_origin()
def post_response():
    global stateId, state, participantId, leftHand

    if state == None:
        return "state is NONE. Please call /status get request first", 400

    if request.json["response"]["view"] == SurveyId.DEMOGRAPHICS:
        leftHand = request.json["response"]["demographics"]["values"]["handedness"] == "left-handed"

    path = f"responses/{participantId}-{stateId}.json"
    with open(path, 'x') as outfile:
        json.dump({
            "task": state.as_dict(),
            "response": request.json
        }, outfile, indent=4, ensure_ascii=False)

    stateId += 1
    return "OK"
