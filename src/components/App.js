import React from "react";
import ReactGA from "react-ga";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "./../stylesheets/App.css";
import PortfolioHome from "./views/portfolio/Home";
import CompanyHome from "./views/company/Home";
import GalleryHome from "./views/gallery/Home";

export default function App() {
  ReactGA.initialize("UA-148190769-1");
  return (
    <Router basename="/">
      <div className="app-wrapper">
        <Routes>
          <Route path="/company" element={<CompanyHome />} />
          <Route path="/gallery" element={<GalleryHome />} />
          <Route exact path="/" element={<PortfolioHome />} />
        </Routes>
      </div>
    </Router>
  );
}
