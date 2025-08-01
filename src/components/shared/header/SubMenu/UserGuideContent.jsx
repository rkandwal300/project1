import React from "react";
import { Button, DialogContent } from "@mui/material";
import UserGuideEIA  from '@/assets/EIA_User_Guide.pdf';
import UserGuideCCA from '@/assets/AMD_CCA1.pdf'
import { useTheme } from "@emotion/react";
import { isCCA } from "@/lib/router";


export default function UserGuideContent({ onClose }) {
    const UserGuide = isCCA() ? UserGuideCCA : UserGuideEIA;
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
