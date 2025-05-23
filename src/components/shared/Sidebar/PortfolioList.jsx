import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  useTheme,
} from "@mui/material";

const portfolios = [
  "apiauto7", "test", "Aditya", "cello", "Test", "Test0", "Demo16",
  "Test388", "Test387", "Test1", "Test2", "Test3", "Test4",
  "Test5", "Test6", "Test7", "Test8", "Test9", "Test10",
];

export default function PortfolioList() {
  const [activePortfolio, setActivePortfolio] = useState("test");
  const theme = useTheme();

  return (
    <Box sx={{ height: "70vh", overflowY: "auto" }}>
      <List id="dashboard-portfolio-list">
        {portfolios.map((portfolio) => {
          const isActive = portfolio === activePortfolio;

          return (
            <ListItem
              key={portfolio}
              button
              onClick={() => setActivePortfolio(portfolio)}
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
                    {portfolio}
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
