import SelectHoc from "@/components/ui/Select";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export const EditableSelectCell = ({
  value,
  options,
  onChange,
  table,
  ...props
}) => (
  <SelectHoc
    variant="filled"
    value={value}
    options={options}
    onChange={(val) => {
      table.options.meta.setEditingCell({ rowIndex: null, columnId: null });
      onChange(val.target.value);
    }}
    sx={{
      height: 40,
      bgcolor: "#292929",
      color: "#fff",
      "&:hover": { bgcolor: "#333" },
      "& .MuiSelect-select": { p: "8px 16px" },
      "& .MuiSelect-icon": { color: "#fff" },
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          bgcolor: "#212121",
          color: "#fff",
          "& .MuiMenuItem-root": {
            fontSize: 16,
            fontWeight: 400,
            py: "10px",
            "&.Mui-selected, &.Mui-selected:hover, &:hover": {
              backgroundColor: "#333",
            },
          },
        },
      },
    }}
    {...props}
  />
);

export const EditableTextCell = ({ value, onChange, ...props }) => (
  <TextField
    value={value}
    onChange={(e) => e.target.value > 0 && onChange(e.target.value)}
    sx={{
      height: 40,
      width: "fit-content",
      minWidth: 40,
      fullWidth: true,
      borderRadius: 4,
      bgcolor: "#292929",
      boxShadow: "none",
      "&:hover": { bgcolor: "#333" },
      "& .MuiOutlinedInput-root": {
        color: "#fff",
        "& input": { color: "#fff" },
        "&.Mui-focused": {
          backgroundColor: "#333",
          boxShadow: "none",
        },
        "&.Mui-focused fieldset": { borderColor: "#333" },
      },
      "& .MuiInputLabel-root": { color: "#fff" },
    }}
    size="small"
    variant="outlined"
    {...props}
  />
);

EditableTextCell.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

EditableSelectCell.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  table: PropTypes.object.isRequired,
};
