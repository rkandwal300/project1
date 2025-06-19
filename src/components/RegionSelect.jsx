import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { 
  Chip, 
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
} from "@mui/material";
 
 
 
const RegionsSelect = React.memo(function RegionsSelect({
  
  regionOptions,
  value,
  onChange,
  theme,
  ...rest
}) {
  const isAllSelected = useMemo(
    () => regionOptions.length > 0 && value.length === regionOptions.length,
    [regionOptions, value]
  );

  const handleSelect = (selected) => {
    if (selected.includes("selectAll")) {
      onChange(isAllSelected ? [] : regionOptions);
    } else {
      onChange(selected.filter((v) => v !== "selectAll"));
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="regions-label">Regions</InputLabel>
      <Select
        labelId="regions-label"
        id="regions"
        multiple
        value={value}
        onChange={(e) => handleSelect(e.target.value)}
        input={<OutlinedInput label="Regions" />}
        slots={
          {
            MenuItem:{
              bgcolor:'red'
            }
          }
        }
        renderValue={(selected) => (
          <Box
            sx={{
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: theme.palette.grey[800],
              fontWeight: 400,
            }}
          >
            {selected.length > 0 && <Chip label={selected[0]} />}
            {selected.length > 1 && `(+${selected.length - 1} others)`}
          </Box>
        )}
      
        {...rest}
      >
        <MenuItem value="selectAll" >
          <Checkbox checked={isAllSelected} />
          Select All
        </MenuItem>
        {regionOptions.map((region) => (
          <MenuItem key={region} value={region}>
            <Checkbox checked={value.includes(region)} />
            {region}
          </MenuItem>
        ))}
      </Select>
    </FormControl>)
});

RegionsSelect.propTypes = {
  regionOptions: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  theme: PropTypes.object,
};; 
export default RegionsSelect;