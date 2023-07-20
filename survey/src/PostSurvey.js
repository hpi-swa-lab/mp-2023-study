import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Likert } from './Widgets.js';

export function PostSurvey({ report, loading }) {
  const textEntry = useState(4) 
  const deletion = useState(4) 
  const navigation = useState(4) 

  return (
    <Container maxWidth="sm">
      <Likert control={textEntry} question="Text entry felt natural to me." />
      <Likert control={deletion} question="Deletion felt natural to me." />
      <Likert control={navigation} question="Navigation felt natural to me." />

      <Button
        style={{ margin: "auto", display: "block", marginTop: "1rem" }}
        variant="contained"
        disabled={loading}
        onClick={() => report("postSurvey", {values: [textEntry[0], deletion[0], navigation[0]]})}
      >
        Submit
      </Button>
    </Container>
  );
}

