import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SunIcon from "@material-ui/icons/Brightness5";
import MoonIcon from "@material-ui/icons/Brightness2";

import useToggle from "../../utils/hooks/useToggle";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../redux/features/userSlice";
import Drawer from "./Drawer";

export const useStyle = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  void: {
    flexGrow: 1,
  },
  lightMode: {
    textDecoration: "none",
    fontSize: "1.5em",
    color: theme.palette.primary,
  },
  darkMode: {
    textDecoration: "none",
    fontSize: "1.5em",
    color: "white",
  },
}));

function NavBar() {
  const classes = useStyle();
  const { darkMode } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isDrawerOpen, toggleDrawer] = useToggle();

  const { pathname } = useLocation();
  const isItemPage = pathname === "/item" || pathname === "/" ? true : false;

  return (
    <div>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
          <NavLink
            className={darkMode ? classes.darkMode : classes.lightMode}
            to={isItemPage ? "/venta" : "/item"}
          >
            {isItemPage ? "ir a Venta" : "ir a Item"}
          </NavLink>
          <div className={classes.void} />
          <IconButton onClick={() => dispatch(toggleDarkMode())}>
            {darkMode ? <span role="img">🌞</span> : <span role="img">🌛</span>}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
