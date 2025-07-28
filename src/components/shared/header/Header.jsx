import { AppBar, Toolbar, useTheme } from "@mui/material";
import SubMenu from "./SubMenu/SubMenu";
import Logo from "./Logo";
import Title from "./Title";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";
import CCATitle, { CCA_LINKS } from "./CCATitle";
import { useLocation } from "react-router-dom";


function Header() { 
  const theme = useTheme(); 
   const location = useLocation(); 
  const isCCA = location.pathname ==    CCA_LINKS.MANAGE_PORTFOLIO||location.pathname ==    CCA_LINKS.EXPLORER;
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.dark,
        zIndex: 1006,
        height: "64px",
        justifyContent: { md: "center" },
        boxShadow: 4,
        borderRadius: 0,
        paddingTop: { xs: 2, sm: 0 },
      }}
      id="header-bar-container"
    >
      <Toolbar 
          sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
          paddingLeft: 2,
          gap: { md: 2, xs: 2 },
        }}
      >
         
          <Logo />

          {isCCA ? <CCATitle /> 
          :<Title />  }

        <SubMenu />
      </Toolbar>
    </AppBar>
  );
}

const HeaderWithErrorBoundary = withErrorBoundary(
  Header,
  "Header component has some Errors"
);
export default HeaderWithErrorBoundary;
