import React, { useState, useEffect, useMemo } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export function TLX({ report, loading}) {
  const [scores, setScores] = useState([50, 50, 50, 50, 50, 50]);

  const questions = [
    {
      key: "mental",
      caption: "Geistige Anforderung",
      question: "Wie stark hat dich die Aufgabe geistig gefordert?",
      low: "Sehr wenig",
      high: "Sehr hoch",
    },
    {
      key: "physical",
      caption: "Körperliche Anforderung",
      question: "Wie stark hat dich die Aufgabe körperlich gefordert?",
      low: "Sehr wenig",
      high: "Sehr hoch",
    },
    {
      key: "temporal",
      caption: "Zeitdruck",
      question: "Wie gehetzt oder unter zeitlichem Druck warst du bei der Aufgabe?",
      low: "Sehr wenig",
      high: "Sehr hoch",
    },
    {
      key: "performance",
      caption: "Leistung",
      question: "Wie erfolgreich hast du die Aufgabe erfüllen können?",
      low: "Perfekt",
      high: "Fehlschlag",
    },
    {
      key: "effort",
      caption: "Anstrengung",
      question: "Wie sehr hast du dich anstrengen müssen um dieses Level an Leistung zu erbringen?",
      low: "Sehr wenig",
      high: "Sehr hoch",
    },
    {
      key: "frustration",
      caption: "Frustration",
      question: "Wie unsicher, entmutigt, irritiert, gestresst oder genervt bist du gewesen?",
      low: "Sehr wenig",
      high: "Sehr hoch",
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
        Absenden
      </Button>
    </Container>
  );
}

