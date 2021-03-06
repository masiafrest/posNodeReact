import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Container from "@material-ui/core/Container";
import ThemeProvider from "./components/ThemeProvider";

import AuthRoute from "./components/AuthRoute";
import Login from "./pages/login";
import NavBar from "./components/Navbar";
import Item from "./pages/item";
import Cliente from "./pages/cliente";
import Categoria from "./pages/categoria";
import Venta from "./pages/recibos/venta";
import Usuario from "./pages/usuario";
import ConteoInv from "./pages/conteoInventario";

import { checkToken } from "./utils";
checkToken(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Router>
            <NavBar />
            <Switch>
              <Container>
                <AuthRoute exact path="/" component={Item} />
                <Route path="/login" component={Login} />
                <AuthRoute path="/item" component={Item} />
                <AuthRoute path="/item/new/:page" component={Item} />
                <AuthRoute path="/venta" component={Venta} />
                <AuthRoute path="/cliente" component={Cliente} />
                <AuthRoute path="/cliente/new/:page" component={Cliente} />
                <AuthRoute path="/categoria" component={Categoria} />
                <AuthRoute path="/categoria/new/:page" component={Categoria} />
                <AuthRoute path="/usuario" component={Usuario} />
                <AuthRoute path="/conteoInv" component={ConteoInv} />
              </Container>
            </Switch>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
