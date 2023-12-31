import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Gender, Likert, Text, Field, Frequency, Handedness } from './Widgets.js';
import { height } from "@mui/system";

export function Demographics({ report, loading }) {
  const age = useState(0);
  const gender = useState('female')
  const genderOther = useState('')
  const occupation = useState('')
  const digitalFreq = useState(4)
  const vrFreq = useState(4)
  const handedness = useState('left-handed')
  const height = useState(170);

  return (
    <Container maxWidth="sm">
      <Text control={age} question="Wie alt sind Sie?" />
      <Gender control={gender} controlOther={genderOther} />
      <Text control={occupation} question="Welchen Beruf üben Sie aus?" />
      <Handedness control={handedness} />
      <Text control={height} question="Wie groß sind Sie (in cm)?" />
      <Frequency control={digitalFreq} question="Wie oft nutzen Sie digitale Geräte (PC,Smartphone,...)?" />
      <Frequency control={vrFreq} question="Wie oft nutzen Sie 'Virtual Reality' oder 'Augmented Reality'?" />

      <Button
        style={{ margin: "auto", display: "block", marginTop: "1rem" }}
        variant="contained"
        disabled={loading}
        onClick={() => report("demographics", { values: { "age": age[0], "gender": gender[0] === 'other' ? genderOther[0] : gender[0], "occupation": occupation[0], "handedness": handedness[0], "height" : height[0], "digitalFreq": digitalFreq[0], "vrFreq": vrFreq[0] } })}
      >
        Absenden
      </Button>
    </Container>
  );
}

