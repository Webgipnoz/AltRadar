import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AirDropsPage from "./pages/AirDropsPage";
import StabilityPage from "./pages/StabilityPage";
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/airdrops" element={<AirDropsPage />} />
        <Route path="/stabilityCoins" element={<StabilityPage />} />
      </Routes>
    </>
  );
}

export default App;
