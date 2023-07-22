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

participantId = 0
stateId = 0
state = None


@app.route("/status")
@cross_origin()
def get_state():
    global state

    experiment_conditions: list[Condition] = balancedLatinSquare(
        conditions, participantId % len(conditions))

    survey_ids = [
        SurveyId.DEMOGRAPHICS,
        [[c, c, c, SurveyId.TLX] for c in experiment_conditions]
    ]
    survey_ids = list(flatten(survey_ids))

    if stateId >= len(survey_ids):
        raise Exception(
            "finished. Restart sever with new participantId to start again.")

    survey_id = survey_ids[stateId]

    if survey_id == SurveyId.DEMOGRAPHICS:
        state = State(
            platform=Platform.PC,
            surveyId=survey_id,
            stateId=stateId,
            toProof="",
            statements=[],
            arrangeable=False
        )
        return state.as_json()

    if survey_id == SurveyId.TLX:
        state = State(
            platform=Platform.PC,
            surveyId=survey_id,
            stateId=stateId,
            toProof="",
            statements=[],
            arrangeable=False
        )
        return state.as_json()

    only_conditions = [c for c in survey_ids[0:(stateId+1)] if c in conditions]
    task_index = len(only_conditions) - 1

    (toProof, statements) = get_statements(
        *[statementsMatrix[n][task_index] for n in range(len(statementsMatrix))])

    state = State(
        platform=Platform.VR if survey_id in [
            Condition.VRDecomp, Condition.VRNoDecomp] else Platform.PC,
        surveyId=survey_id,
        stateId=stateId,
        toProof=toProof,
        statements=statements,
        arrangeable=True if survey_id in [
            Condition.DesktopDecomp, Condition.VRDecomp] else False
    )
    return state.as_json()


@app.route("/response",  methods=['POST'])
@cross_origin()
def post_response():
    global stateId, state, participantId

    path = f"responses/{participantId}-{stateId}.json"
    with open(path, 'x') as outfile:
        json.dump({
            "task": state.as_dict(),
            "response": request.json
        }, outfile, indent=4, ensure_ascii=False)

    stateId += 1
    return "OK"
