import ReactDOM from "react-dom/client";
import App from "@/App";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Failed to find the root element.");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
