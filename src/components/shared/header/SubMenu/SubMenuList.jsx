import {
  IconButton,
  Typography,
  Button,
  Box,
  Tooltip,
  useTheme,
  CircularProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Suspense, lazy } from "react";
import DialogHoc from "../../../ui/Dialog";
import MenuHoc from "../../../ui/Menu";
import { userEmail } from "@/lib/constant";
import { useNavigate } from "react-router-dom";
import { isCCA, isEIA, ROUTES } from "@/lib/router";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const UserMenu = lazy(() => import("./UserMenu"));
const StatCollectorDescription = lazy(() =>
  import("./StatCollectorDescription")
);

function SubMenuList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const iconButtonStyle = {
    width: 24,
    height: 24,
    padding: 0,
  };

  const tooltipProps = {
    componentsProps: {
      tooltip: {
        sx: {
          backgroundColor: theme.palette.dark.secondary,
          color: theme.palette.error.contrastText,
          fontSize: 12,
          padding: "6px 12px",
          borderRadius: 1,
          boxShadow: 3,
        },
      },
    },
  };

  // Fallback loader for Suspense
  const Loader = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 80,
      }}
    >
      <CircularProgress size={24} />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
      {isEIA() ? <DialogHoc
        trigger={({ onClick }) => (
          <Button
            variant="outlined"
            endIcon={<OpenInNewIcon />}
            id="btn-stat-collector"
            onClick={onClick}
            sx={{
              borderColor: theme.palette.error.contrastText,
              color: theme.palette.error.contrastText,
              textTransform: "none",
              whiteSpace: "nowrap",
              paddingX: 1.5,
              minWidth: "unset",
            }}
          >
            Meta Collector
          </Button>
        )}
        content={({ handleClose }) => (
          <Suspense fallback={Loader}>
            <StatCollectorDescription onClose={handleClose} />
          </Suspense>
        )}
      /> : <></>}
      <Tooltip title="Support" {...tooltipProps}>
        <IconButton
          // href="/support"
          id="step-three-target"
          sx={{
            ...iconButtonStyle,
            borderRadius: "50%",
            backgroundColor: theme.palette.error.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.error.contrastText,
            },
          }}
          onClick={() => navigate(ROUTES.SUPPORT)}
        >
          <HeadsetMicIcon sx={{ color: "black", fontSize: 15 }} />
        </IconButton>
      </Tooltip>
      <MenuHoc
        trigger={({ onClick }) => (
          <Tooltip title="Profile" {...tooltipProps}>
            <IconButton
              id={"step-four-target"}
              sx={{ ...iconButtonStyle, pr: "5px" }}
              onClick={onClick}
            >
              <AccountCircleIcon
                id="btn-header-user-profile"
                sx={{ color: theme.palette.error.contrastText, fontSize: 24 }}
              />
            </IconButton>
          </Tooltip>
        )}
        content={({ onClose }) => (
          <Suspense fallback={Loader}>
            <UserMenu onClose={onClose} />
          </Suspense>
        )}
      />

      <Tooltip title={userEmail} {...tooltipProps}>
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            minWidth: 200,
          }}
        >
          <Typography
            variant="body2"
            className="username-container"
            sx={{
              color: theme.palette.error.contrastText,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {userEmail}
          </Typography>
        </Box>
      </Tooltip>
    </Box>
  );
}

export default SubMenuList;
