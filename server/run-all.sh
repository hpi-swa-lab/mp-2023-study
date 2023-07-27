for i in {1..22}
do
   curl -X GET http://127.0.0.1:5000/status
   curl -X POST -H "Content-Type: application/json" -d '{"view": "demographics", "demographics": {"values": {"handedness": "right-handed", "height": 175}}, "param2": "value2"}' http://127.0.0.1:5000/response
done

# forceNext
#curl -X POST -H "Content-Type: application/json" http://127.0.0.1:5000/forceNext

# setStateId
#curl -X POST -H "Content-Type: application/json" -d '{"stateId": 10}' http://127.0.0.1:5000/setStateId