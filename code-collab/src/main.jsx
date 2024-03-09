import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './style.css';
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Components/context/auth.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster />
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </>
);
