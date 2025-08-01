import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { eiaReleaseNotesTableData } from "./header/SubMenu/ReleaseNotes/ReleaseNotes.data";
import { ccaReleaseNotesTableData } from "./header/SubMenu/ReleaseNotes/ReleaseNotes.data"; 
import { isCCA } from "@/lib/router";
const ReleaseNotesPage = () => {
  const sectionRefs = useRef({}); 
  const [activeVersion, setActiveVersion] = useState(null);

  const data = isCCA() ? ccaReleaseNotesTableData : eiaReleaseNotesTableData;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const entry of data) {
        const el = sectionRefs.current[entry.version];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveVersion(entry.version);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (version) => {
    const section = sectionRefs.current[version];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box display="flex" >
      <Box flex={1} p={4} pr={2} >
        <Typography variant="h4" gutterBottom>
          Release Notes
        </Typography>
        <Typography variant="body1" gutterBottom>
          The following features have been made available for general
          availability.
        </Typography>

        {eiaReleaseNotesTableData.map((entry) => (
          <Box
            key={entry.version}
            ref={(el) => (sectionRefs.current[entry.version] = el)}
            mb={6}
          >
            <Typography variant="h6" sx={{ mt: 4, fontWeight: 600 }}>
              {entry.version} ({entry.releaseDate})
            </Typography>
            <Typography variant="caption" color="textSecondary" gutterBottom>
              Updated: {entry.releaseDate}
            </Typography>
            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle1" fontWeight="bold" mt={2}>
              Major Changes:
            </Typography>
            {entry.majorFeatures.map((feature, idx) => (
              <Box key={idx} ml={2} mt={1}>
                <Typography variant="subtitle2" fontWeight="bold">
                  • {feature.label}
                </Typography>
                {feature.values.map((text, i) => (
                  <Typography variant="body2" key={i} ml={2}>
                    - {text}
                  </Typography>
                ))}
              </Box>
            ))}

            <Typography variant="subtitle1" fontWeight="bold" mt={3}>
              Minor Changes:
            </Typography>
            {entry.minorImprovements.map((improve, idx) => (
              <Box key={idx} ml={2} mt={1}>
                <Typography variant="subtitle2" fontWeight="bold">
                  • {improve.label}
                </Typography>
                {improve.values.map((text, i) => (
                  <Typography variant="body2" key={i} ml={2}>
                    - {text}
                  </Typography>
                ))}
              </Box>
            ))}

            {entry.upComing?.length > 0 && (
              <>
                <Typography variant="subtitle1" fontWeight="bold" mt={3}>
                  Upcoming:
                </Typography>
                {entry.upComing.map((up, idx) => (
                  <Box key={idx} ml={2} mt={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      • {up.label}
                    </Typography>
                    {up.values.map((text, i) => (
                      <Typography variant="body2" key={i} ml={2}>
                        - {text}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </>
            )}
          </Box>
        ))}
      </Box>
      <Box
        width={260}
        pl={2}
        pr={2}
        pt={4}
        borderLeft="1px solid #e0e0e0"
        sx={{
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          On this Page
        </Typography>
        <List dense disablePadding>
          {eiaReleaseNotesTableData.map((entry) => (
            <ListItemButton
              key={entry.version}
              onClick={() => handleScrollToSection(entry.version)}
              sx={{
                borderRadius: 1,
                textTransform: "none",
                backgroundColor:
                  activeVersion === entry.version
                    ? "action.hover"
                    : "transparent",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemText
                primary={`${entry.version} - ${entry.releaseDate}`}
                primaryTypographyProps={{
                  fontSize: 14,
                  color: "text.primary",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ReleaseNotesPage;
