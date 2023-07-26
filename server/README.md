# server

```bash
python -m venv env
source env/bin/activate
pip install black flask flask-cors
```

Start server with `python -m flask --app app run --debug --host=0.0.0.0`

Results are saved to the responses folder. You need to restart the server per participant and, as of now, change the participantId variable in code to the current participant.

For iterating through all responses, have a look at the sh file.
