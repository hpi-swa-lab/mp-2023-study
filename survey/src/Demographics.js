import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Gender, Likert, Text, Field } from './Widgets.js';

export function Demographics({ report, loading }) {
  const age = useState(0);
  const gender = useState('female') 
  const genderOther = useState('') 
  const progExp = useState('') 
  const profProgExp = useState('') 
  const jsExp = useState(4) 
  const regexExp = useState(4) 
  const clojureExp = useState(4) 

  return (
    <Container maxWidth="sm">
      <Text control={age} question="What is your age?" />
      <Gender control={gender} controlOther={genderOther} />
      <Text control={progExp} question="How many years of programming experience do you have?" />
      <Text control={profProgExp} question="How many years of professional programming experience do you have?" />
      <Likert control={jsExp} question="I am familiar with the JavaScript language." />
      <Likert control={regexExp} question="I am familiar with the Regular Expression language." />
      <Likert control={clojureExp} question="I am familiar with the Clojure language." />

      <Button
        style={{ margin: "auto", display: "block", marginTop: "1rem" }}
        variant="contained"
        disabled={loading}
        onClick={() => report("demographics", {values: [age[0], gender[0] === 'other' ? genderOther[0] : gender[0], progExp[0], profProgExp[0], jsExp[0], regexExp[0], clojureExp[0]]})}
      >
        Submit
      </Button>
    </Container>
  );
}

