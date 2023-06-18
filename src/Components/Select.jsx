import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({UnitSelect}) {
  const [unit, setUnit] = React.useState("All");

  const handleChange = (SelectChangeEvent) => {
    setUnit(SelectChangeEvent.target.value);
    UnitSelect(SelectChangeEvent.target.value)
  };

  return (
    <div>
    
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Unit</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={unit}
          label="Age"
          onChange={handleChange}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
               <MenuItem value={'All'}>All</MenuItem>
          <MenuItem value={'Benglore'}>Benglore</MenuItem>
          <MenuItem value={'Mumbai'}>Mumbai</MenuItem>
          <MenuItem value={'Delhi'}>Delhi</MenuItem>
          <MenuItem value={'Chennai'}>Chennai</MenuItem>
          <MenuItem value={'Peru'}>Peru</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
