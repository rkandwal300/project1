import { AppBar, Toolbar, useTheme } from "@mui/material";
import SubMenu from "./SubMenu/SubMenu";
import Logo from "./Logo";
import Title from "./Title";

export default function Header() {
  const theme = useTheme()
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
