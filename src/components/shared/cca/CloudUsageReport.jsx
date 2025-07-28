import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Divider,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import ConnectionIcon from "@mui/icons-material/SettingsEthernet";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { nanoid } from "@reduxjs/toolkit";
import {
  selectCurrentProviderName,
  selectCurrentProviderRegions,
} from "@/redux/features/providerData/providerData.selector";
import { selectInstanceList } from "@/redux/features/instanceList/instanceList.selector";
import { addInstance } from "@/redux/features/instanceList/instanceList.slice";
import { useTheme } from "@emotion/react";
import useTimedMessage from "@/hooks/useTimedMessage";
import FormAlert from "@/components/ui/FormAlert";
import { CCA_LINKS } from "../header/CCATitle";

const MOCK_CONFIG = {
  TEXT_INPUT_TYPE: "outlined",
  TEXT_INPUT_DENSITY: "standard",
};

const CloudUsageReports = () => {
  const navigate = useNavigate();
  const currentProvider = useSelector(selectCurrentProviderName);
  const instanceList = useSelector(selectInstanceList);
  const dispatch = useDispatch();
  const theme = useTheme();
  const options = {
    region: useSelector(selectCurrentProviderRegions),
  };
  const formId = nanoid();
  const [pageTitle] = useState("Add Portfolio");

  const [formError, setFormError] = useTimedMessage();
  const [formSuccess, setFormSuccess] = useTimedMessage();
  const [formData, setFormData] = useState({
    name: "",
    accessID: "",
    accessSecret: "",
    region: [],
    clientID: "",
    clientSecret: "",
    subscriptionID: "",
    tenantID: "",
    gcpclientID: "",
    clientEmail: "",
    projectID: "",
    privatekey: "",
  });

  const [visibility, setVisibility] = useState({
    accessID: false,
    accessSecret: false,
    clientID: false,
    clientSecret: false,
    gcpclientID: false,
    projectID: false,
  });

  const [loading, setLoading] = useState({
    addAccountCardLoadingStatus: false,
    testLoadingButton: false,
    saveLoadingButton: false,
  });

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  // Helper to update formData
  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Toggle visibility for password fields
  const toggleVisibility = (key) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const redirectToMainPage = () => {
    navigate(`/?type=${currentProvider}`);
  };

  const clearPortfolioData = () => {
    setFormData({
      name: "",
      accessID: "",
      accessSecret: "",
      region: [],
      clientID: "",
      clientSecret: "",
      subscriptionID: "",
      tenantID: "",
      gcpclientID: "",
      clientEmail: "",
      projectID: "",
      privatekey: "",
    });
  };

  const testConnection = () => {
    setLoading((prev) => ({ ...prev, testLoadingButton: true }));
    setTimeout(() => {
      alert("Test connection successful (mock)");
      setLoading((prev) => ({ ...prev, testLoadingButton: false }));
    }, 1500);
  };

  const discardChanges = () => {
    setOpenConfirmDialog(false);
    redirectToMainPage();
  };

  const cancelDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleSavePortFolio = () => {
    const trimmedName = formData.name?.trim();
    if (!trimmedName || trimmedName.length < 3) {
      setFormError(
        "Please enter a portfolio name with at least 3 characters. Only letters, numbers, underscores (_), and hyphens (-) are allowed; no other special characters."
      );
      return;
    }

    const isDuplicate = instanceList.some(
      (instance) => instance.name === trimmedName && instance.id
    );

    if (isDuplicate) {
      setFormError("Portfolio name already exists");
      return;
    }

    const instances = {
      region: "us-west-2",
      instanceType: "m5.2xlarge",
      quantity: 1,
      noOfHours: 730,
      pricingModel: "ondemand",
      cloud: "AWS",
      instance_name: "DataDogTeam",
      uuid: "DatadogTeam",
    };
    const payload = {
      id: formId,
      instances,
      name: trimmedName,
      provider: currentProvider,
      type: "cloudreports",
    };
    dispatch(addInstance(payload));
    navigate(`${CCA_LINKS.CLOUD_USAGE_REPORT}/${formId}`);
    dispatch(setFormSuccess(`${trimmedName} saved successfully`));
  };

  return (
    <Box width="100%">
      {/* Header */}
      <Box
        id="cusagereport-header-controls-container"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          p: 1,
          mb: 1,
        }}
      >
        <Typography sx={{ ml: 1, fontSize: "1.2rem", fontWeight: 700 }}>
          {pageTitle}
        </Typography>
        <Button
          onClick={redirectToMainPage}
          sx={{ minWidth: "auto", padding: 0 }}
        >
          <CloseIcon />
        </Button>
      </Box>

      {/* Form Card */}
      <Box
        sx={{
          m: 1,
          p: 1,
          border: "1px solid #ccc",
          borderRadius: 1,
          mb: 4,
          position: "relative",
          backgroundColor: "white",
        }}
      >
        {loading.addAccountCardLoadingStatus && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(255,255,255,0.6)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <Box id="Aws-box">
          {/* Portfolio Name */}
          <TextField
            fullWidth
            label="Portfolio Name"
            variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
            margin="normal"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            required
          />

          <Typography sx={{ fontWeight: 500 }}>Secrets</Typography>
          <Divider sx={{ mb: 2 }} />

          {/* AWS Fields */}
          {currentProvider === "AWS" && (
            <Box
              sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1, mb: 2 }}
            >
              <TextField
                label="Access ID *"
                variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
                type={visibility.accessID ? "text" : "password"}
                value={formData.accessID}
                onChange={(e) => updateFormData("accessID", e.target.value)}
                sx={{ flex: "1 1 30%" }}
                InputProps={{
                  endAdornment: (
                    <Button
                      size="small"
                      onClick={() => toggleVisibility("accessID")}
                    >
                      {visibility.accessID ? <Visibility /> : <VisibilityOff />}
                    </Button>
                  ),
                }}
              />
              <TextField
                label="Access Secret *"
                variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
                type={visibility.accessSecret ? "text" : "password"}
                value={formData.accessSecret}
                onChange={(e) => updateFormData("accessSecret", e.target.value)}
                sx={{ flex: "1 1 30%" }}
                InputProps={{
                  endAdornment: (
                    <Button
                      size="small"
                      onClick={() => toggleVisibility("accessSecret")}
                    >
                      {visibility.accessSecret ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </Button>
                  ),
                }}
              />
              <Autocomplete
                multiple
                options={options["region"] || []}
                value={formData.region}
                onChange={(event, newValue) =>
                  updateFormData("region", newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Region *"
                    variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
                  />
                )}
                sx={{ flex: "1 1 30%" }}
              />
            </Box>
          )}
        </Box>

        {/* AZURE Fields */}
        {currentProvider === "AZURE" && (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
            <TextField
              label="Client ID *"
              variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
              type={visibility.clientID ? "text" : "password"}
              value={formData.clientID}
              onChange={(e) => updateFormData("clientID", e.target.value)}
              sx={{ flex: "1 1 30%" }}
              InputProps={{
                endAdornment: (
                  <Button
                    size="small"
                    onClick={() => toggleVisibility("clientID")}
                  >
                    {visibility.clientID ? <Visibility /> : <VisibilityOff />}
                  </Button>
                ),
              }}
            />
            <TextField
              label="Client Secret *"
              variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
              type={visibility.clientSecret ? "text" : "password"}
              value={formData.clientSecret}
              onChange={(e) => updateFormData("clientSecret", e.target.value)}
              sx={{ flex: "1 1 30%" }}
              InputProps={{
                endAdornment: (
                  <Button
                    size="small"
                    onClick={() => toggleVisibility("clientSecret")}
                  >
                    {visibility.clientSecret ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </Button>
                ),
              }}
            />
            <TextField
              label="Subscription ID *"
              variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
              value={formData.subscriptionID}
              onChange={(e) => updateFormData("subscriptionID", e.target.value)}
              sx={{ flex: "1 1 30%" }}
            />
            <TextField
              label="Tenant ID *"
              variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
              value={formData.tenantID}
              onChange={(e) => updateFormData("tenantID", e.target.value)}
              sx={{ flex: "1 1 30%" }}
            />
            <Autocomplete
              multiple
              options={options["region"]}
              value={formData.region}
              onChange={(event, newValue) => updateFormData("region", newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Region"
                  variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
                />
              )}
              sx={{ flex: "1 1 30%" }}
            />
          </Box>
        )}

        {/* GCP Fields */}
        {currentProvider === "GCP" && (
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, md: 5 }}>
                <TextField
                  label="Client ID *"
                  variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
                  type={visibility.gcpclientID ? "text" : "password"}
                  value={formData.gcpclientID}
                  onChange={(e) =>
                    updateFormData("gcpclientID", e.target.value)
                  }
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <Button
                        size="small"
                        onClick={() => toggleVisibility("gcpclientID")}
                      >
                        {visibility.gcpclientID ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <TextField
                  label="Client Email *"
                  variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
                  value={formData.clientEmail}
                  onChange={(e) =>
                    updateFormData("clientEmail", e.target.value)
                  }
                  fullWidth
                />
              </Grid>

              {/* Project ID and Region in one row */}
              <Grid item size={{ xs: 12, md: 5 }}>
                <TextField
                  label="Project ID *"
                  variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
                  type={visibility.projectID ? "text" : "password"}
                  value={formData.projectID}
                  onChange={(e) => updateFormData("projectID", e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <Button
                        size="small"
                        onClick={() => toggleVisibility("projectID")}
                      >
                        {visibility.projectID ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 5 }}>
                <Autocomplete
                  multiple
                  options={options["region"]}
                  value={formData.region}
                  onChange={(event, newValue) =>
                    updateFormData("region", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Region"
                      variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 10 }}>
                <TextField
                  label="Private Key *"
                  variant={MOCK_CONFIG.TEXT_INPUT_TYPE}
                  multiline
                  minRows={3}
                  value={formData.privatekey}
                  onChange={(e) => updateFormData("privatekey", e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <Dialog open={openConfirmDialog} onClose={cancelDialog}>
        <DialogTitle>Confirm Cancel</DialogTitle>
        <DialogContent>
          Are you sure you want to discard changes and leave this page?
        </DialogContent>
        <DialogActions>
          <Button onClick={discardChanges} color="error">
            Discard
          </Button>
          <Button onClick={cancelDialog} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        className="action-footer"
        sx={{
          padding: 1,
          spacing: 2,
          bgcolor: theme.palette.grey[100],
          color: theme.palette.text.default,
        }}
        marginTop={"32%"}
      >
        <Grid item size={{ xs: 12, md: 8 }}>
          <Typography variant="body2">
            <strong>Note:</strong> On click of SAVE button, you are authorizing
            us to fetch all the instances available in the region to us
          </Typography>
        </Grid>
        <Grid
          item
          size={{ xs: 12, md: 4 }}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              id="btn-cusagereport-reset"
              variant="contained"
              color="error"
              startIcon={<RefreshIcon />}
              onClick={clearPortfolioData}
              sx={{ textTransform: "none" }}
            >
              Reset
            </Button>

            <Button
              id="btn-cusagereport-testconnection"
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
              startIcon={loading.testLoadingButton ? null : <ConnectionIcon />}
              onClick={testConnection}
              disabled={loading.testLoadingButton}
            >
              {loading.testLoadingButton ? (
                <>
                  <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                  Testing...
                </>
              ) : (
                "Test"
              )}
            </Button>

            <Button
              id="btn-cusagereport-cancel"
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
              startIcon={<CloseIcon />}
              onClick={redirectToMainPage}
            >
              Cancel
            </Button>

            <Button
              id="btn-cusagereport-save"
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
              startIcon={loading.saveLoadingButton ? null : <SaveIcon />}
              onClick={handleSavePortFolio}
              disabled={loading.saveLoadingButton}
            >
              {loading.saveLoadingButton ? (
                <>
                  <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
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
        {formSuccess}
      </FormAlert>
    </Box>
  );
};

export default CloudUsageReports;
