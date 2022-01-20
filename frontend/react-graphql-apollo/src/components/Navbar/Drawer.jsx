import { NavLink, useHistory } from "react-router-dom";
import { Drawer, List, ListItem, Typography } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { signOut, signoutSucess } from "../../redux/features/userSlice";

import { useStyle } from "./";

export default function ({ isDrawerOpen, toggleDrawer }) {
  const classes = useStyle();

  const {
    authenticated,
    credentials: { rol },
    darkMode,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const history = useHistory();

  const links = [
    "item",
    "venta",
    "cliente",
    "categoria",
    "conteo de inventario",
  ];

  rol === "ADMIN" && links.push("usuario");

  const NavLinkOnClick = ({ to, children }) => (
    <NavLink
      to={to}
      onClick={toggleDrawer}
      className={darkMode ? classes.darkMode : classes.lightMode}
    >
      <Typography variant="h4" gutterBottom>
        {children}
      </Typography>
    </NavLink>
  );

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
      <List>
        {links.map((text, index) => (
          <ListItem button key={text}>
            <NavLinkOnClick
              to={`/${text === "conteo de inventario" ? "conteoInv" : text}`}
            >
              {text}
            </NavLinkOnClick>
          </ListItem>
        ))}
        {authenticated && (
          <ListItem
            button
            key="signout"
            onClick={() => {
              toggleDrawer();
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
  );
}
