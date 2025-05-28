import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectInstanceList } from "@/redux/features/instanceList/insatanceList.selector";
import {
  setInstanceStats,
  updateFormData,
  updateSelfPrefAssessment,
} from "@/redux/features/instance/instance.slice";

export default function PortfolioList() {
  const [activePortfolio, setActivePortfolio] = useState("test");
  const theme = useTheme();
  const dispatch = useDispatch();
  const portfolios = useSelector(selectInstanceList);
  const handleClickListItem = (id) => {
    const portfolio = portfolios.find((portfolio) => portfolio.id === id);
    if (!portfolio) return;
    const {id:pfId, portfolioName, instances, selfPrefAssessment } = portfolio;
    setActivePortfolio(portfolioName);
    dispatch(
      setInstanceStats({
        instanceStats: instances,
      })
    );
    console.log({pfId,id})
    dispatch(
      updateFormData({
        id:pfId,
        portfolioName,
      })
    );
    dispatch(updateSelfPrefAssessment(selfPrefAssessment));
  };
  return (
    <Box sx={{ height: "70vh", overflowY: "auto" }}>
      <List id="dashboard-portfolio-list">
        {portfolios.map((portfolio) => {
          const isActive = portfolio === activePortfolio;

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
                  : "transparent",
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
