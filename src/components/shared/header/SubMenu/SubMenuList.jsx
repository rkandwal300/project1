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
import DescriptionIcon from "@mui/icons-material/Description";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Suspense, useMemo, useCallback, lazy } from "react";
import DialogHoc from "../../../ui/Dialog";
import MenuHoc from "../../../ui/Menu";

// Dynamic lazy imports
const lazyImport = (factory) => {
  return lazy(() => factory().then(module => ({ default: module.default })));
};

const ReleaseNotes = lazyImport(() => import("./ReleaseNotes/ReleaseNotes"));
const SupportMenu = lazyImport(() => import("./SupportMenu"));
const UserMenu = lazyImport(() => import("./UserMenu"));
const StatCollectorDescription = lazyImport(() => import("./StatCollectorDescription"));

const Loader = (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 80 }}>
    <CircularProgress size={24} />
  </Box>
);

function SubMenuList() {
  const theme = useTheme();
  const userEmail = "testuser@infobellit.com";

  // Memoize styles and tooltip props for performance
  const iconButtonStyle = useMemo(() => ({
    width: 24,
    height: 24,
    padding: 0,
  }), []);

  const tooltipProps = useMemo(() => ({
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
  }), [theme.palette.dark.secondary, theme.palette.error.contrastText]);

  // Memoized renderers for dialog/menu content
  const renderStatCollectorDescription = useCallback(
    ({ handleClose }) => (
      <Suspense fallback={Loader}>
        <StatCollectorDescription onClose={handleClose} />
      </Suspense>
    ),
    []
  );

  const renderReleaseNotes = useCallback(
    (props) => (
      <Suspense fallback={Loader}>
        <ReleaseNotes {...props} />
      </Suspense>
    ),
    []
  );

  const renderSupportMenu = useCallback(
    () => (
      <Suspense fallback={Loader}>
        <SupportMenu />
      </Suspense>
    ),
    []
  );

  const renderUserMenu = useCallback(
    ({ onClose }) => (
      <Suspense fallback={Loader}>
        <UserMenu onClose={onClose} />
      </Suspense>
    ),
    []
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
      <DialogHoc
        trigger={({ onClick }) => (
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            id="btn-stat-collector"
            onClick={onClick}
            sx={{
              borderColor: theme.palette.error.contrastText,
              color: theme.palette.error.contrastText,
              textTransform: "none",
              whiteSpace: "nowrap",
              px: 1.5,
              minWidth: "unset",
            }}
          >
            Stat Collector
          </Button>
        )}
        content={renderStatCollectorDescription}
      />
      <DialogHoc
        trigger={({ onClick }) => (
          <Tooltip title="Release Notes" {...tooltipProps}>
            <IconButton id="step-one-target" onClick={onClick}>
              <DescriptionIcon
                sx={{ fontSize: 24, color: theme.palette.error.contrastText }}
              />
            </IconButton>
          </Tooltip>
        )}
        content={renderReleaseNotes}
      />
      <MenuHoc
        trigger={({ onClick }) => (
          <Tooltip title="Support" {...tooltipProps}>
            <IconButton
              onClick={onClick}
              id="step-three-target"
              sx={{
                ...iconButtonStyle,
                borderRadius: "50%",
                backgroundColor: theme.palette.error.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.error.contrastText,
                },
              }}
            >
              <HeadsetMicIcon sx={{ color: "black", fontSize: 15 }} />
            </IconButton>
          </Tooltip>
        )}
        content={renderSupportMenu}
      />
      <MenuHoc
        trigger={({ onClick }) => (
          <Tooltip title="Profile" {...tooltipProps}>
            <IconButton
              id="step-four-target"
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
        content={renderUserMenu}
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
