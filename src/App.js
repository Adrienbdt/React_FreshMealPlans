import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Shop } from "./Shop";
// import { NotFound } from "./NotFound";

// import "./App.css";

function App() {
  return (
    <React.Fragment>
      {/* Setting the router */}
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/order" component={Shop} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
