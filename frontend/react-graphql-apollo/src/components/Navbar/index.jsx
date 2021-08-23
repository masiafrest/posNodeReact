import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";

//MUI
import {
  AppBar,
  Toolbar,
  IconButton,
  Switch,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { useSelector, useDispatch } from "react-redux";
import { signOut, signoutSucess } from "../../redux/features/userSlice";

function NavBar() {
  const isAuth = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const history = useHistory();

  console.log("navbar", isAuth);
  const toggleDrawer = (isOpen) => (e) => {
    setIsDrawerOpen(isOpen);
  };

  const NavLinkOnClick = ({ to, children }) => (
    <NavLink to={to} onClick={toggleDrawer(false)}>
      <Typography variant="h4" gutterBottom>
        {children}
      </Typography>
    </NavLink>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <List>
              <ListItem button key="home">
                <NavLinkOnClick to={"/"}>home</NavLinkOnClick>
              </ListItem>
              {["item", "venta", "cliente", "categoria", "devolucion"].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <NavLinkOnClick to={"/" + text}>{text}</NavLinkOnClick>
                  </ListItem>
                )
              )}
              {isAuth && (
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
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
