import React from "react";
import { Button, DialogContent } from "@mui/material";
import UserGuide  from '@/assets/EIA_User_Guide.pdf';
import { useTheme } from "@emotion/react";


export default function UserGuideContent({ onClose }) {
    const theme = useTheme();
    return (
        <DialogContent
            dividers
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "80vh",
                p: 0,

            }}
        >
            <Button
                variant="outlined"
                color={"primary"}
                sx={{ alignSelf: "flex-end", m: 1 ,bgcolor: theme.palette.dark, color: theme.palette.primary.contrastText}}
                onClick={onClose}
            >
                Close
            </Button>
            <iframe
                src={UserGuide}
                title="EIA User Guide"
                width="100%"
                height="100%"
                style={{ border: "none", flex: 1 }}
            />
        </DialogContent>
    );
}
