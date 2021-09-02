import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import CloseSnackBar from "./components/CloseSnackBar";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

//redux
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Container from "@material-ui/core/Container";

import AuthRoute from "./components/AuthRoute";
import Login from "./pages/login";
import NavBar from "./components/Navbar";
import Item from "./pages/item";
import Cliente from "./pages/cliente";
import Categoria from "./pages/categoria";
import Venta from "./pages/recibos/venta";
import Devolucion from "./pages/recibos/devolucion";

import { checkToken } from "./utils";
checkToken(store);

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: "dark",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={2}
            action={(key) => {
              return <CloseSnackBar key={key} />;
            }}
          >
            <Router>
              <NavBar />
              <Switch>
                <Container>
                  <AuthRoute exact path="/" component={Item} />
                  <Route path="/login" component={Login} />
                  <AuthRoute path="/item" component={Item} />
                  <AuthRoute path="/item/new/:page" component={Item} />
                  <AuthRoute path="/venta" component={Venta} />
                  <AuthRoute path="/devolucion" component={Devolucion} />
                  <AuthRoute path="/cliente" component={Cliente} />
                  <AuthRoute path="/cliente/new/:page" component={Cliente} />
                  <AuthRoute path="/categoria" component={Categoria} />
                  <AuthRoute
                    path="/categoria/new/:page"
                    component={Categoria}
                  />
                </Container>
              </Switch>
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
