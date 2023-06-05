import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";

const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/mynotes" component={MyNotes} />
        <Route exact path="/favorites" component={Favorites} />
      </Routes>
    </Router>
  );
};

export default Pages;
