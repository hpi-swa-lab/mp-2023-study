import React, { useState, useEffect, useMemo } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";

export function Likert({question, help, control: [get, set]}) {
  return <Field question={question} help={help}>
    <Slider
      value={get}
      onChange={(e, val) => set(val)}
      track={false}
      marks={Array.from({ length: 7 }, (_, i) => ({
        value: i + 1,
        label: i === 0 ? 'Strongly disagree' : i === 6 ? 'Strongly agree' : null,
      }))}
      min={1}
      max={7}
    />
  </Field>;
}

export function Field({question, help, children}) {
  return <Box sx={{ width: "100%" }}>
    <h3>{question}</h3>
    {help && <p>{question}</p>}
    {children}
  </Box>;
}

export function Text({question, help, control: [get, set]}) {
  return <Field question={question} help={help}>
    <TextField value={get} onChange={(e) => set(e.target.value)} />
  </Field>;
}

export function Gender({control: [get, set], controlOther: [getOther, setOther]}) {
  return <Field question="What gender do you identify as?">
    <RadioGroup value={get} onChange={e => set(e.target.value)}>
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="prefer-not-to-say" control={<Radio />} label="Prefer not to say" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
    </RadioGroup>
    <TextField placeholder="Please specify" disabled={get !== 'other'} value={getOther} onChange={e => setOther(e.target.value)}/>
  </Field>;
}

