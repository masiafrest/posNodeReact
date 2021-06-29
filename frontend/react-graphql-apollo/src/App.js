import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/Navbar";
import Item from "./pages/item";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/home">home</Route>
        <Route path="/item/" component={Item} />
        <Route path="/item/new/:page" component={Item} />
      </Switch>
    </Router>
  );
}

export default App;
