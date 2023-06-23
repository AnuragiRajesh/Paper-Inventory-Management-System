import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({ UnitSelect, uprodunit }) {
  console.log(uprodunit, "lable")
  const [unit, setUnit] = React.useState("");

  const handleChange = (SelectChangeEvent) => {
    setUnit(SelectChangeEvent.target.value);
    UnitSelect(SelectChangeEvent.target.value)
  };

  return (
    <div>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Units</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={unit}
          label="Units"
          onChange={handleChange}
        >
          <MenuItem value={0}>
            <em>All</em>
          </MenuItem>
          {uprodunit.map((unit) => (
            <MenuItem key={unit.unitId} value={unit.unitId}>
              {unit.unitName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
