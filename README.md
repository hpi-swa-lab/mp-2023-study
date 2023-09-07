# Study

This directory contains files to conduct a study. The study tests the effects of decomposition of information in VR and in a Desktop environment.

## Structure

- This directory contains "index.html" and "admin.html", which are the front-end for the Desktop part of the study, and for administration of the entire study.
- This directory also contains "server.py". This can be used to run the Desktop part of the study (i.e. host the HTML and js files, which can then be accessed via browser). On Windows this is required, on Linux one can simply start a server with `python -m http.server`.
- the js directory contains necessary files for running the Desktop part of the study.
- The "server" directory contains the python server which controls the study. Find further information in that directory's README.
- The "survey" directory contains the survey used to gather demographic information and TLX survey. Different from the other Desktop survey material, this is React based and needs to be built according to that directory's README.

# Running the study

- A: Start the study control server in the "server" directory, select a participant id (you might have to do this twice). The id will determine the tested conditions.
- B: Start the desktop server (e.g. with the server.py file). If you have started the control server on a different host, edit the server constant at the top of the js/api.js file.
- C: Start the VR part of the study.
- D: Optionally: Open the admin panel by navigating to admin.html on the desktop server.
- E: Conduct the study. During the study, the results will be stored in the server/responses directory, prefixed with the participant id.
