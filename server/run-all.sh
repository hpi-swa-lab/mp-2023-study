for i in {1..17}
do
   curl -X GET http://127.0.0.1:5000/status
   curl -X POST -H "Content-Type: application/json" -d '{"view": "demographics", "demographics": {"values": {"handedness": "right-handed", "height": 175}}, "param2": "value2"}' http://127.0.0.1:5000/response
done