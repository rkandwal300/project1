import React from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux"; 
import useTimedMessage from "@/hooks/useTimedMessage";
import FormAlert from "@/components/FormAlert";
import { FIND_AND_REPLACE_FIELD_TYPES } from "@/lib/constant"; 
import PropTypes from "prop-types";
import FindReplaceRow from "./FindReplaceRow";
import { selectInstances } from "@/redux/features/instance/instance.selector";
import { findAndReplace } from "@/redux/features/instance/instance.slice";

// Zod Schema
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

export default function FindAndReplace({ onClose }) {
  const dispatch = useDispatch();
  const instances = useSelector(selectInstances);

  const defaultValues = {
    values: FIND_AND_REPLACE_FIELD_TYPES.reduce((acc, { key }) => {
      acc[key] = { from: "", to: "" };
      return acc;
    }, {}),
  };

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
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

  // Helper to get unique values for each field type from instances
  const getUniqueOptions = (key) => {
    const values = instances.map((instance) => instance[key]);
    return Array.from(new Set(values)).filter((v) => v !== undefined && v !== null && v !== "");
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
            id={`${key}Target`}
            name={key}
            label={label}
            options={options}
            control={control}
            error={errors.values?.[key]}
            selectedOptions={getUniqueOptions(key)}
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
          id="ReplaceAllButton"
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
