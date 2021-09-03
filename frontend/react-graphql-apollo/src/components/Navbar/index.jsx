import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  FormControlLabel,
  Grid,
  Switch,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { useSelector, useDispatch } from "react-redux";
import {
  signOut,
  signoutSucess,
  toggleDarkMode,
} from "../../redux/features/userSlice";

const useStyle = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  void: {
    flexGrow: 1,
  },
  navLink: {
    backgroundColor: "blue",
    color: "white",
    borderStyle: "solid",
    borderRadius: "15px",
    textDecoration: "none",
    padding: "15px 15px 0px 15px",
  },
}));

function NavBar() {
  const classes = useStyle();
  const { authenticated, darkMode } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const history = useHistory();

  const toggleDrawer = (isOpen) => (e) => {
    setIsDrawerOpen(isOpen);
  };

  const NavLinkOnClick = ({ to, children }) => (
    <NavLink to={to} onClick={toggleDrawer(false)} className={classes.navLink}>
      <Typography variant="h4" gutterBottom>
        {children}
      </Typography>
    </NavLink>
  );

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
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <List>
              {["item", "venta", "cliente", "categoria", "devolucion"].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <NavLinkOnClick to={"/" + text}>{text}</NavLinkOnClick>
                  </ListItem>
                )
              )}
              {authenticated && (
                <ListItem
                  button
                  key="signout"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    dispatch(signoutSucess());
                    history.push("/login");
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    SignOut
                  </Typography>
                </ListItem>
              )}
            </List>
          </Drawer>
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
