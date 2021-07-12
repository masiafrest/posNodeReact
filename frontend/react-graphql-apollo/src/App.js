import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";

//redux
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
              <Route path="/home">home</Route>
              <Route path="/item" component={Item} />
              <Route path="/item/new/:page" component={Item} />
              <Route path="/venta" component={Venta} />
              <Route path="/cliente" component={Cliente} />
              <Route path="/cliente/new/:page" component={Cliente} />
              <Route path="/categoria" component={Categoria} />
              <Route path="/categoria/new/:page" component={Categoria} />
            </Switch>
          </Router>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
