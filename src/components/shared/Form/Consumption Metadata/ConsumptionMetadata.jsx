import React, { useEffect, useState, lazy } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Add, FileCopy } from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { CONSUMPTION_FIELDS } from "@/lib/constant";
import { AnimatedIconButton } from "./AnimatedIconButton";
import DialogHoc from "@/components/ui/Dialog";
import FindAndReplace from "./FindAndReplace";
// import Icon from "@mdi/react";
// import { mdiFileReplace } from "@mdi/js";
//  npm i material-design-icons
// Lazy load components
const HoverInput = lazy(() => import("@/components/ui/form/Input"));

function ConsumptionMetadata({ form }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setAnimate((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  const renderFields = ({ name, tooltipMessage, label }) => (
    <Controller
      key={name}
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <HoverInput
          id={`${name}Target`}
          label={label}
          fullWidth
          hideClearIcon={true}
          value={field.value ?? ""}
          error={!!fieldState.error}
          tooltipMessage={tooltipMessage}
          onChange={(e) => {
            const value = e.target.value;
            // Only update if value is a number (allow empty string for clearing)
            if (value === "" || !isNaN(Number(value))) {
              field.onChange(Number(value));
            }
          }}
        />
      )}
    />
  );

  return (
    <Box
      display="flex"
      gap="16px"
      sx={{
        px: 2,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        gap="16px"
        sx={{ width: "100%", alignItems: "center" }}
      >
        <Box sx={{ minWidth: "141px", width: "141px", }}>
          <Typography
            fontSize="14px"
            color="secondary.default"
            variant="body1"
            gutterBottom
          >
            Consumption Metadata
          </Typography>
        </Box>

        <Box
          id="consumption-metadata-form"
          role="ConsumptionMetadataForm"
          sx={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(5, 1fr)" },
            width: "100%",
          }}
        >
          {CONSUMPTION_FIELDS.map(renderFields)}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap="16px">
        <Button
          id="addInstanceFormTarget"
          variant="contained"
          color="primary"
          type="submit"
          size="small"
        >
          <Add />
        </Button>
        <DialogHoc
          trigger={({ onClick }) => (
            <Button
              id="findAndReplace"
              variant="contained"
              color="primary"
              size="small"
              onClick={onClick}
            >
              <FileCopy />
              {/* <Icon path={mdiFileReplace} size={1} /> */}
            </Button>
          )}
          content={({ handleClose }) => (
            <FindAndReplace onClose={handleClose} />
          )}
          sx={{ width: "400px", m: "auto" }}
        />
        <AnimatedIconButton className={animate ? "animate" : ""}>
          <HelpOutlineIcon />
        </AnimatedIconButton>
      </Box>
    </Box>
  );
}

ConsumptionMetadata.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
};

export default React.memo(ConsumptionMetadata);
