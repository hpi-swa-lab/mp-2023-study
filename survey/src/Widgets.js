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

export function Frequency({question, help, control: [get,set]}) {
  return <Field question={question} help={help}>
    <Slider
      value={get}
      onChange={(e, val) => set(val)}
      track={false}
      marks={Array.from({ length: 7 }, (_, i) => ({
        value: i + 1,
        label: i === 0 ? 'Noch nie' 
        : i === 1 ? 'Erst gelegentlich ausprobiert'
        : i === 2 ? 'Etwa einmal im Jahr'
        : i === 3 ? 'Mehr als einmal im Jahr'
        : i === 4 ? 'Mehr als einmal im Monat'
        : i === 5 ? 'Mehr als einmal in der Woche'
        : i === 6 ? 'Etwa jeden Tag' : null,
      }))}
      min={1}
      max={7}
      className="frequency-slider"
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
  return <Field question="Mit welchem Geschlecht identifizieren Sie sich?">
    <RadioGroup value={get} onChange={e => set(e.target.value)}>
      <FormControlLabel value="female" control={<Radio />} label="weiblich" />
      <FormControlLabel value="male" control={<Radio />} label="männlich" />
      <FormControlLabel value="prefer-not-to-say" control={<Radio />} label="keine Angabe" />
      <FormControlLabel value="other" control={<Radio />} label="anders" />
    </RadioGroup>
    <TextField placeholder="Bitte geben Sie etwas anderes an:" disabled={get !== 'other'} value={getOther} onChange={e => setOther(e.target.value)}/>
  </Field>;
}

export function Handedness({control: [get, set]}) {
  return <Field question="Sind Sie links oder rechtshändig?">
    <RadioGroup value={get} onChange={e => set(e.target.value)}>
      <FormControlLabel value="left-handed" control={<Radio />} label="linkshändig" />
      <FormControlLabel value="right-handed" control={<Radio />} label="rechtshändig" />
      <FormControlLabel value="ambidexterity" control={<Radio />} label="beidhändig (Ambidextrie)" />
    </RadioGroup>
  </Field>
}
