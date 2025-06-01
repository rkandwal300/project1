import ResponsiveSubMenu from "./ResponsiveSubmenu";
import SubMenuList from "./SubMenuList";
import { useMediaQuery, useTheme } from "@mui/material";

export default function SubMenu() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  

  if (isMobile) return <ResponsiveSubMenu />;
  return <SubMenuList />;
}
