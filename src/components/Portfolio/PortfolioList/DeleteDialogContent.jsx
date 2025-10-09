import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Close, Cancel, Check } from "@mui/icons-material";

const DeleteDialogContent = ({ 
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "Are you sure you want to Delete this Portfolio?",
  confirmText = "DELETE",
  cancelText = "CANCEL",
  confirmColor = "#00bcd4", 
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        color: "primary.contrastText",
        borderRadius: "8px",
        minWidth: "400px",
        
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 24px 16px 24px",
          fontSize: "24px",
          fontWeight: 400,
        }}
      >
        {title}
        <IconButton
          onClick={onClose}
          sx={{
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent
        sx={{
          padding: "16px 24px 24px 24px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            lineHeight: 1.4,
            color: "#ffffff",
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions
        sx={{
          padding: "0 24px 24px 24px",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          startIcon={<Close />}
          sx={{
            color: "#ffffff",
            borderColor: "rgba(255, 255, 255, 0.3)",
            backgroundColor: "transparent",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "uppercase",
            "&:hover": {
              borderColor: "#ffffff",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          variant="outlined"
          startIcon={<Check />}
          sx={{
            color: confirmColor,
            borderColor: confirmColor,
            backgroundColor: "transparent",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: `${confirmColor}20`, // 20% opacity
              borderColor: confirmColor,
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Box>
  );
};

export default DeleteDialogContent;
