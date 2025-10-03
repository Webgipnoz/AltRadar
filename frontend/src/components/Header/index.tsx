import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">Alpha Rotator</h1>
      <nav className="header__nav">
        <Link to="/">
          <button>Today</button>
        </Link>
        <Link to="/airdrops">
          <button>Airdrops</button>
        </Link>
        <Link to="/stabilityCoins">
          <button>Stability</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
