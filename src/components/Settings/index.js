import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function Settings({tempUnit, changeTempUnit}) {
  return (
    <div>
      <h2>Current temp is {tempUnit}</h2>
      <FormControl component="fieldset">
        <FormLabel component="legend">Temperature unit:</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={tempUnit} onChange={changeTempUnit}>
          <FormControlLabel value="metric" control={<Radio />} label="ºC" />
          <FormControlLabel value="imperial" control={<Radio />} label="ºF" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}
