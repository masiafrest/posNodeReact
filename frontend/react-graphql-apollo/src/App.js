import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";

//redux
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AuthRoute from "./components/Navbar/AuthRoute";
import Login from "./pages/login";
import NavBar from "./components/Navbar";
import Item from "./pages/item";
import Cliente from "./pages/cliente";
import Categoria from "./pages/categoria";
import Venta from "./pages/recibos/venta";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider maxSnack={2}>
          <Router>
            <NavBar />
            <Switch>
              <Route path="/login" component={Login} />
              <AuthRoute path="/home">home</AuthRoute>
              <AuthRoute path="/item" component={Item} />
              <AuthRoute path="/item/new/:page" component={Item} />
              <AuthRoute path="/venta" component={Venta} />
              <AuthRoute path="/cliente" component={Cliente} />
              <AuthRoute path="/cliente/new/:page" component={Cliente} />
              <AuthRoute path="/categoria" component={Categoria} />
              <AuthRoute path="/categoria/new/:page" component={Categoria} />
            </Switch>
          </Router>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
