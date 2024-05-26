import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <div className="h-screen bg-stone-800">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gamePage" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
