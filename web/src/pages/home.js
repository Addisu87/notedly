import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Notedly</h1>
      <p>This is the home page</p>
      {/* add a list of links */}
      <ul>
        <li>
          <Link to="/mynotes" />
          My Notes
        </li>
        <li>
          <Link to="/favorites" />
          Favorites
        </li>
      </ul>
    </div>
  );
};

export default Home;
