import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import ZTAILogin from "./components/ZTAILogin";
import ZTAIDashboard from "./components/ZTAIDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ZTAILogin />} />
          <Route path="/dashboard" element={<ZTAIDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;