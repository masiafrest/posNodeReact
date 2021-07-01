import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import NavBar from "./components/Navbar";
import Item from "./pages/item";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/home">home</Route>
            <Route path="/item/" component={Item} />
            <Route path="/item/new/:page" component={Item} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
