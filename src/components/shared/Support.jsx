import React, { useState, memo } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Grid,
  Paper,
  Divider,
  ListItemText,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  AddLocation as AddLocationIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import uk from "@/assets/UK.svg";
import us from "@/assets/US.svg";
import denmark from "@/assets/denmark.svg";
import germany from "@/assets/Germany.svg";
import DialogHoc from "../ui/Dialog";
import UserGuideContent from "./header/SubMenu/UserGuideContent";
import { supportEmailBody, supportEmailSubject } from "@/lib/constant";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/router";

const CONTACTS = [
  {
    country: "United States",
    phone: "+1 888-795-3738",
    email: "dl.epycservices@amd.com",
    logo: us,
  },
  {
    country: "United Kingdom",
    phone: "+44 800 260 6982",
    email: "dl.epycservices@amd.com",
    logo: uk,
  },
  {
    country: "Germany",
    phone: "+49 8000009148",
    email: "dl.epycservices@amd.com",
    logo: germany,
  },
  {
    country: "Denmark",
    phone: "+45 80 82 03 18",
    email: "dl.epycservices@amd.com",
    logo: denmark,
  },
];

const CustomAccordion = memo(({ title, id, children }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
    >
      <AccordionSummary
        id={id}
        expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
      >
        <Typography fontWeight={600}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
});

const ContactCard = memo(({ contact }) => (
  <Paper
    elevation={3}
    sx={{
      borderRadius: 3,
      overflow: "hidden",
      boxShadow: 3,
      minWidth: 220,
      maxWidth: 320,
      mx: "auto",
    }}
  >
    <Box
      sx={{
        height: 120,
        bgcolor: "#f0f0f0",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: "hidden",
        width: 300,
        transition: "transform 0.3s ease",
        "&:hover img": {
          transform: "scale(1.05)",
        },
      }}
    >
      <img
        src={contact.logo}
        alt={`${contact.country} flag`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        loading="lazy"
      />
    </Box>
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight="semibold" gutterBottom>
        <AddLocationIcon
          fontSize="small"
          sx={{ verticalAlign: "middle", mr: 0.5 }}
        />
        {contact.country}
      </Typography>
      <Link
        component="a"
        href={`tel:${contact.phone}`}
        display="flex"
        alignItems="center"
        gap={1}
        mt={1}
        color={"black"}
        underline="none"
      >
        <PhoneIcon fontSize="small" />
        <Typography variant="body2">{contact.phone}</Typography>
      </Link>
      <Link
        component="a"
        href={`mailto:${contact.email}?subject=${encodeURIComponent(
          supportEmailSubject
        )}&body=${encodeURIComponent(supportEmailBody)}`}
        display="flex"
        alignItems="center"
        gap={1}
        mt={0.5}
        color={"black"}
        underline="none"
      >
        <MailIcon fontSize="small" />

        <Typography variant="body2">{contact.email}</Typography>
      </Link>
    </Box>
  </Paper>
));

const Support = () => {
  const navigate = useNavigate()
  return(
  <Box sx={{ width: "100%", p: { xs: 2, md: 6 } }}>
    <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
      Need Help Finding Something?
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      fontWeight="bold"
      gutterBottom
    >
      We've got you covered!
    </Typography>

    <Divider sx={{ my: 4 }} />

    <Typography variant="h6" fontWeight="bold" gutterBottom>
      <HelpIcon
        fontSize="large"
        sx={{ verticalAlign: "middle", mr: 0.5, mb: 0.5 }}
      />
      Support
    </Typography>
    <Typography variant="body1" gutterBottom>
      Find helpful documentation and guides to get started quickly, understand
      key features, and make the most of the AMD EPYC Cloud Instance Advisor.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Need help? Refer to the Contact Details section below for region-specific
      support.
    </Typography>

    <CustomAccordion id="gettingStarted" title="Getting Started">
      <Typography>
        Learn the basics of setting up and using your instance advisor
        effectively.
      </Typography>
    </CustomAccordion>

    <CustomAccordion id="userGuide" title="User Guide">
      <Typography sx={{ mb: "10px" }}>
        Full user documentation including features, workflows, and examples.
      </Typography>
      <DialogHoc
        trigger={({ onClick }) => (
          <Typography
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={onClick}
          >
            View User Guide ↗
          </Typography>
        )}
        content={({ handleClose }) => (
          <UserGuideContent onClose={handleClose} />
        )}
      />
    </CustomAccordion>

    <CustomAccordion id="step-one-target" title="Release Notes">
      <Typography gutterBottom>
        Stay updated with the latest enhancements, new feature additions, and
        bug fixes introduced in each release of EPYC Cloud Instance Advisor.
      </Typography>
      <Typography id="openReleaseNotes" onClick={()=>navigate(ROUTES.RELEASE_NOTES)} underline="hover">
        View Release Notes ↗
      </Typography>
    </CustomAccordion>

    <Divider sx={{ my: 4 }} />

    <Typography variant="h6" fontWeight="bold" gutterBottom>
      <PhoneIcon
        fontSize="inherit"
        sx={{ verticalAlign: "middle", mr: 0.5, mb: 0.5 }}
      />
      Contact Details
    </Typography>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 3,
        my: 2,
      }}
    >
      {CONTACTS.map((contact) => (
        <ContactCard key={contact.country} contact={contact} />
      ))}
    </Box>
  </Box>
)};

export default memo(Support);
