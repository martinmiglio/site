import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./../stylesheets/App.css";
import PortfolioHome from "./views/portfolio/Home";
import CompanyHome from "./views/company/Home";

export default function App() {
  return (
    <Router basename="/">
      <div className="app-wrapper">
        <Switch>
          <Route path="/company" component={CompanyHome} />
          <Route exact path="/" component={PortfolioHome} />
        </Switch>
      </div>
    </Router>
  );
}
