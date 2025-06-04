import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentInstance,
  selectInstanceList,
} from "@/redux/features/instanceList/instanceList.selector";
import {
  addSelfAssessment,
  resetForm,
  updateFormData,
  updateResetState,
  uploadInstance,
} from "@/redux/features/form/formData.slice";
import { useNavigate } from "react-router-dom";
import { selectHideInstances } from "@/redux/features/form/formData.selector";
import { addCurrentInstance } from "@/redux/features/instanceList/instanceList.slice";

export default function PortfolioList() {
  const navigate = useNavigate();
  const activePortfolio = useSelector(selectCurrentInstance);
  const theme = useTheme();
  const dispatch = useDispatch();
  const portfolios = useSelector(selectInstanceList);

  const showTable = useSelector(selectHideInstances);

  const handleClickListItem = (instanceId) => {
    const portfolio = portfolios.find(
      (portfolio) => portfolio.id === instanceId
    );
    if (!portfolio) return;
    const { id, portfolioName, instances, selfPrefAssessment } = portfolio;
    dispatch(addCurrentInstance(id));
    dispatch(resetForm(false));
    dispatch(uploadInstance(instances));
    dispatch(addSelfAssessment(selfPrefAssessment));
    dispatch(
      updateFormData({
        id,
        portfolioName,
      })
    );
    dispatch(updateResetState(true));
    navigate("/");
  };
  useEffect(() => {
    if (showTable) {
      dispatch(addCurrentInstance(null));
    }
  }, [dispatch, showTable]);
  return (
    <Box sx={{ height: "70vh", overflowY: "auto" }}>
      <List id="dashboard-portfolio-list">
        {portfolios.map((portfolio) => {
          const isActive = portfolio.id === activePortfolio;
          return (
            <ListItem
              key={portfolio.id}
              button
              onClick={() => handleClickListItem(portfolio.id)}
              selected={isActive}
              sx={{
                cursor: "pointer",
                borderRadius: 1,
                mb: 0.5,
                p: 1,
                backgroundColor: isActive
                  ? theme.palette.primary.main
                  : theme.palette.primary.contrastText,
                color: isActive
                  ? theme.palette.primary.contrastText
                  : "inherit",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  color: theme.palette.primary.contrastText,
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    className="item-title"
                    fontWeight={isActive ? 500 : "normal"}
                    fontSize={12}
                  >
                    {portfolio.portfolioName}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
