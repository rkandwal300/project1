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
import { selectInstanceList } from "@/redux/features/instanceList/instanceList.selector";
import { useNavigate, useLocation } from "react-router-dom";
import { addCurrentInstance } from "@/redux/features/instanceList/instanceList.slice";
import { updateInstanceState } from "@/redux/features/instance/instance.slice";
import { selectInstances } from "@/redux/features/instance/instance.selector";

export default function PortfolioList() {
  const navigate = useNavigate();
  const activePortfolio = useLocation().pathname.split("/")[1];
  const theme = useTheme();
  const dispatch = useDispatch();
  const portfolios = useSelector(selectInstanceList);

  const instances = useSelector(selectInstances);
  const showTable = instances.length > 0;

  const handleClickListItem = (instanceId) => {
    const portfolio = portfolios.find(
      (portfolio) => portfolio.id === instanceId
    );
    if (!portfolio) return;
    dispatch(addCurrentInstance(portfolio.id));
    dispatch(updateInstanceState(portfolio));

    navigate(`/${portfolio.id}`);
  };
  useEffect(() => {
    if (!showTable) {
      dispatch(addCurrentInstance(null));
    }
  }, [dispatch, showTable]);
  return (
    <Box sx={{ height: "70vh", overflowY: "auto" }}>
      <List id="dashboard-portfolio-list">
        {portfolios.map((portfolio) => {
          const isActive = portfolio.id == activePortfolio;
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
                    {portfolio.name}
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
