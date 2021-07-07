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

function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const history = useHistory();

  const toggleDrawer = (isOpen) => (e) => {
    setIsDrawerOpen(isOpen);
  };

  const NavLinkOnClick = ({ to, children }) => (
    <NavLink to={to} onClick={toggleDrawer(false)}>
      <Typography variant="h4" gutterBottom>
        {" "}
        {children}{" "}
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
              {["home", "item", "venta", "cliente"].map((text, index) => (
                <ListItem button key={text}>
                  {/* <ListItemText
                    primary={text.toUpperCase()}
                    onClick={() => {
                      toggleDrawer(false);
                      history.push("/" + text);
                    }}
                  /> */}
                  <NavLinkOnClick to={"/" + text}>{text}</NavLinkOnClick>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
