import React, { useCallback, useMemo } from "react";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addCurrentInstance } from "@/redux/features/instanceList/instanceList.slice";
import { updateInstanceState } from "@/redux/features/instance/instance.slice";
import propsTypes from "prop-types";

export default function PortfolioItem({ portfolio }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const activePortfolioId = useMemo(
    () => location.pathname.split("/")[1],
    [location.pathname]
  );

  const isActive = portfolio.id === activePortfolioId;
  const handleSelect = useCallback(
    (portfolio) => {
      dispatch(addCurrentInstance(portfolio.id));
      dispatch(updateInstanceState(portfolio));
      navigate(`/${portfolio.id}`);
    },
    [dispatch, navigate]
  );

  return (
    <ListItemButton
      key={portfolio.id}
      selected={isActive}
      onClick={() => handleSelect(portfolio)}
    >
      <ListItemText
  
        primary={
          <Typography fontWeight={isActive ? 600 : "normal"} fontSize={12}>
            {portfolio.name}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

PortfolioItem.propTypes = {
  portfolio: propsTypes.shape({
    id: propsTypes.string.isRequired,
    name: propsTypes.string.isRequired,
  }).isRequired,
};
