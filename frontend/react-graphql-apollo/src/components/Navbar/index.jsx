import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../redux/features/userSlice";
import Drawer from "./Drawer";

const useStyle = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  void: {
    flexGrow: 1,
  },
  navLink: {
    textDecoration: "none",
    fontSize: "1.5em",
  },
}));

function NavBar() {
  const classes = useStyle();
  const { darkMode } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (isOpen) => (e) => {
    setIsDrawerOpen(isOpen);
  };

  const { pathname } = useLocation();
  const isItemPage = pathname === "/item" || pathname === "/" ? true : false;

  return (
    <div>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            drawerState={[isDrawerOpen, setIsDrawerOpen]}
            toggleDrawer={toggleDrawer}
          />
          <NavLink
            className={classes.navLink}
            to={isItemPage ? "/venta" : "/item"}
          >
            {isItemPage ? "Venta" : "Item"}
          </NavLink>
          <div className={classes.void} />
          <FormControlLabel
            value="top"
            control={
              <Switch
                color="default"
                onChange={() => dispatch(toggleDarkMode())}
              />
            }
            label={`Tema ${darkMode ? "Oscuro" : "Blanco"}`}
            labelPlacement="top"
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
