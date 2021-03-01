import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import Shop  from "../pages/Shop";
import NotFound from "../pages/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

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
