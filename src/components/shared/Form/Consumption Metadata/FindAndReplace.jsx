import React from "react";
import {
  Box,
  Divider,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { selectInstanceStats } from "@/redux/features/form/formData.selector";
import useTimedMessage from "@/hooks/useTimedMessage";
import FormAlert from "@/components/ui/FormAlert";
import {
  FIND_AND_REPLACE_FIELD_TYPES, 
} from "@/lib/constant";
import { findAndReplace } from "@/redux/features/form/formData.slice";
import PropTypes from "prop-types";
import FindReplaceRow from "./FindReplaceRow";



// --- Validation Schema ---
const schema = z
  .object({
    values: z.record(
      z
        .object({
          from: z.string().optional(),
          to: z.string().optional(),
        })
        .refine(
          (val) => {
            if (!val.from && !val.to) return true;
            return val.from && val.to;
          },
          { message: "Both fields must be filled if one is selected" }
        )
    ),
  })
  .strict();

 
 

// --- Main Component ---
export default function FindAndReplace({ onClose }) {
  const dispatch = useDispatch();
  const instances = useSelector(selectInstanceStats);

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { values: {} },
    mode: "onChange",
  });

  const [formError, setFormError] = useTimedMessage();
  const [formSuccess, setFormSuccess] = useTimedMessage();

  const onSubmit = (data) => {
    const formattedData = Object.entries(data.values).reduce(
      (acc, [key, value]) => {
        if (value.from && value.to) {
          acc[key] = { from: value.from, to: value.to };
        }
        return acc;
      },
      {}
    );

    const updatedInstances = instances.map((instance) => {
      let changed = false;
      const newInstance = { ...instance };
      Object.entries(formattedData).forEach(([key, { from, to }]) => {
        if (newInstance[key] === from) {
          newInstance[key] = to;
          changed = true;
        }
      });
      return changed ? newInstance : instance;
    });

    dispatch(findAndReplace(updatedInstances));
    onClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxWidth: 400,
      }}
    >
      <Box sx={{ padding: "8px 12px" }}>
        <Typography
          variant="h4"
          sx={{ color: "primary.main", fontWeight: 700, fontSize: 20 }}
        >
          Find and Replace
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: 2 }}>
        {FIND_AND_REPLACE_FIELD_TYPES.map(({ key, label, options }) => (
          <FindReplaceRow
            key={key}
            name={key}
            label={label}
            options={options}
            control={control}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: "10px 12px",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<CloseIcon />}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || !isDirty}
        >
          Replace All
        </Button>
      </Box>
      <FormAlert
        open={!!formError}
        severity="error"
        onClose={() => setFormError("")}
      >
        {formError}
        disabled={!isValid}
      </FormAlert>
      <FormAlert
        open={!!formSuccess}
        severity="success"
        onClose={() => setFormSuccess("")}
      > 
        Replace All
        {formSuccess}
      </FormAlert>
    </Box>
  );
}

FindAndReplace.propTypes = {
  onClose: PropTypes.func.isRequired,
};
