import { NavLink, useHistory } from "react-router-dom";
import { Drawer, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import { signOut, signoutSucess } from "../../redux/features/userSlice";

const useStyle = makeStyles((theme) => ({
  navLink: {
    textDecoration: "none",
    fontSize: "1.5em",
  },
}));

export default function ({ drawerState, toggleDrawer }) {
  const classes = useStyle();

  const { authenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isDrawerOpen, setIsDrawerOpen] = drawerState;

  const history = useHistory();

  const NavLinkOnClick = ({ to, children }) => (
    <NavLink to={to} onClick={toggleDrawer(false)} className={classes.navLink}>
      <Typography variant="h4" gutterBottom>
        {children}
      </Typography>
    </NavLink>
  );

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
      <List>
        {["item", "venta", "cliente", "categoria", "usuario"].map(
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
  );
}
