import { IconButton, styled } from "@mui/material";

export const AnimatedIconButton = styled(IconButton)(() => ({
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  borderRadius: "50%",
  width: 40,
  height: 40,
  transition: "color 0.5s, background-color 0.5s",
 
  color: "#000",
  "&.animate": {
    color: "#fff",
  },
}));