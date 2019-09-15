import React from "react";
import "./App.css";
import Landing from "./components/Landing";
import About from "./components/About";
import Experience from "./components/Experience";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
//import { useScrollPosition } from "./components/useScrollPosition";
import ExpandableList from "./components/ExpandableList";

function App() {
  return (
    <div className="app-wrapper">
      <Landing />
      <ExpandableList
        contentList={[
          { headerText: "About", content: <About /> },
          { headerText: "Experience", content: <Experience /> },
          { headerText: "Portfolio", content: <Portfolio /> },
          { headerText: "Contact", content: <Contact /> }
        ]}
      />
    </div>
  );
}

export default App;
