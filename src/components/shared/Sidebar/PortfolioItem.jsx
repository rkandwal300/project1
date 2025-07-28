import React, { useCallback } from "react";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addCurrentInstance } from "@/redux/features/instanceList/instanceList.slice";
import { updateInstanceState } from "@/redux/features/instance/instance.slice";
import propsTypes from "prop-types";
import {
  selectCurrentProviderName,
  selectCurrentProviderType,
} from "@/redux/features/providerData/providerData.selector"; 
import { selectCurrentInstance } from "@/redux/features/instanceList/instanceList.selector";
import { ROUTES } from "@/lib/router";

export default function PortfolioItem({ portfolio }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const providerName = useSelector(selectCurrentProviderName);
  const providerType = useSelector(selectCurrentProviderType);
  const activePortfolioId = useSelector(selectCurrentInstance)?.id;

  const isActive = portfolio.id === activePortfolioId; 
  const handleSelect = useCallback(
    (portfolio) => {
      dispatch(addCurrentInstance(portfolio.id));
      dispatch(updateInstanceState(portfolio));

      // Get current query params and preserve them
      const currentParams = new URLSearchParams(location.search);
      currentParams.set("type", providerName);

      let path =
        providerType === "telemetry"
          ? `${ROUTES.TELEMETRY}/${portfolio.id}`
          : `${ROUTES.ROOT}${portfolio.id}`;

      navigate(`${path}?${currentParams.toString()}`, { replace: true });
    },
    [dispatch, location.search, navigate, providerName, providerType]
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
