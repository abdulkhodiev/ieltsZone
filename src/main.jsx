import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/index.js";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ContextProvider>
    </React.StrictMode>
);
