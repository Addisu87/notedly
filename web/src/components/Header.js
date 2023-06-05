import React from "react";
import logo from "../img/logo.svg";

const Header = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} alt="Notedly" />
        <h1>Notedly</h1>
      </header>
    </div>
  );
};

export default Header;
