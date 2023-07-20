import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

let currentElem;
setInterval(function () {
  const demographics = document.getElementById("demographics");
  const postRun = document.getElementById("postRun");
  const postParticipant = document.getElementById("postParticipant");
  console.log(demographics, postRun, postParticipant);

  if (demographics && demographics !== currentElem) {
    currentElem = demographics;
    ReactDOM.createRoot(demographics).render(
      <React.StrictMode>
        <App demographics />
      </React.StrictMode>
    );
  } else if (postRun && postRun !== currentElem) {
    currentElem = postRun;
    ReactDOM.createRoot(postRun).render(
      <React.StrictMode>
        <App postRun />
      </React.StrictMode>
    );
  } else if (postParticipant && postParticipant !== currentElem) {
    currentElem = postParticipant;
    ReactDOM.createRoot(postParticipant).render(
      <React.StrictMode>
        <App postParticipant />
      </React.StrictMode>
    );
  }
});
