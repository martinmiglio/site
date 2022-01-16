import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "./../stylesheets/App.css";
import PortfolioHome from "./views/portfolio/Home";
import CompanyHome from "./views/company/Home";
import GalleryHome from "./views/gallery/Home";

export default function App() {
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
