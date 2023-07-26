import React, { useState } from "react";
import { TLX } from "./TLX.js";
import { PostSurvey } from "./PostSurvey.js";
import { Demographics } from "./Demographics.js";

/*
// https://cs.uwaterloo.ca/~dmasson/tools/latin_square/
function balancedLatinSquare(array, participantId) {
  const result = [];
  // Based on "Bradley, J. V. Complete counterbalancing of immediate sequential effects in a Latin square design. J. Amer. Statist. Ass.,.1958, 53, 525-528. "
  for (var i = 0, j = 0, h = 0; i < array.length; ++i) {
    var val = 0;
    if (i < 2 || i % 2 != 0) {
      val = j++;
    } else {
      val = array.length - h - 1;
      ++h;
    }

    var idx = (val + participantId) % array.length;
    result.push(array[idx]);
  }

  if (array.length % 2 != 0 && participantId % 2 != 0) {
    result = result.reverse();
  }

  return result;
}
  const tasks = balancedLatinSquare(
    [
      "task01a.js",
      "task01b.js",
      "task02a.clj",
      "task02b.clj",
      "task03a.js",
      "task03b.js",
    ],
    runNumber
  );
  */

function App({ demographics, postRun, postParticipant }) {
  const [loading, setLoading] = useState(false);

  const report = async (event, extra) => {
    setLoading(true);
    window.reportSurvey(event, extra);
  };

  const main = postRun ? (
    <TLX
      loading={loading}
      report={async (...args) => {
        await report(...args);
      }}
    ></TLX>
  ) : demographics ? (
    <Demographics
      loading={loading}
      report={async (...args) => {
        await report(...args);
      }}
    />
  ) : postParticipant ? (
    <PostSurvey
      disabled={loading}
      report={async (...args) => {
        await report(...args);
      }}
    />
  ) : (
    <></>
  );

  return <div style={{ padding: "0.5rem" }}>{main}</div>;
}

export default App;
