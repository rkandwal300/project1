import { AppBar, Box, Toolbar, useTheme } from "@mui/material";
import SubMenu from "./SubMenu/SubMenu";
import Logo from "./Logo";
import Title from "./Title";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";

function Header() {
  const theme = useTheme();
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
      bgColor={'red'}
          display={"flex"} gap="10px" justifyContent={"space-between"} alignItems={"center"}

        sx={{
          height: "64px",
          paddingLeft: 2,
          gap: { md: 2, xs: 2 },
        }}
      >
         
          <Logo />
          <Title /> 

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
