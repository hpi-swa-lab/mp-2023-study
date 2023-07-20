import React, { useState, useEffect, useMemo } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export function TLX({ report, loading }) {
  const [scores, setScores] = useState([50, 50, 50, 50, 50, 50]);

  const questions = [
    {
      key: "mental",
      caption: "Mental Demand",
      question: "How mentally demanding was the task?",
      low: "Very low",
      high: "Very high",
    },
    {
      key: "physical",
      caption: "Physical Demand",
      question: "How physically demanding was the task?",
      low: "Very low",
      high: "Very high",
    },
    {
      key: "temporal",
      caption: "Temporal Demand",
      question: "How hurried or rushed was the pace of the task?",
      low: "Very low",
      high: "Very high",
    },
    {
      key: "performance",
      caption: "Performance",
      question:
        "How successful were you in accomplishing what you were asked to do?",
      low: "Perfect",
      high: "Failure",
    },
    {
      key: "effort",
      caption: "Effort",
      question:
        "How hard did you have to work to accomplish your level of performance?",
      low: "Very low",
      high: "Very high",
    },
    {
      key: "frustration",
      caption: "Frustration",
      question:
        "How insecure, discouraged, irritated, stressed, and annoyed were you?",
      low: "Very low",
      high: "Very high",
    },
  ];

  const tickLabel = (i, q) => {
    switch (i) {
      case 10:
        return "|";
      case 0:
        return q.low;
      case 19:
        return q.high;
      default:
        return "";
    }
  };

  return (
    <Container maxWidth="sm">
      {questions.map((q, i) => (
        <Box key={q.key} sx={{ width: "100%" }}>
          <h3>{q.caption}</h3>
          <p>{q.question}</p>
          <Slider
            value={scores[i]}
            onChange={(e, val) =>
              setScores((s) => s.map((v, my) => (my === i ? val : v)))
            }
            defaultValue={50}
            track={false}
            marks={Array.from({ length: 20 }, (_, i) => ({
              value: i * 5,
              label: tickLabel(i, q),
            }))}
            min={0}
            max={100}
          />
        </Box>
      ))}
      <Button
        style={{ margin: "auto", display: "block", marginTop: "1rem" }}
        variant="contained"
        disabled={loading}
        onClick={() => report("scores", { scores })}
      >
        Submit
      </Button>
    </Container>
  );
}

