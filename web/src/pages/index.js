import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";

// define routes
const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/mynotes" element={<MyNotes />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default Pages;
