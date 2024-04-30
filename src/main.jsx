import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/index.js";
import "./index.css";
import { DataProvider } from "./context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <DataProvider>
            <App />
        </DataProvider>
    </React.StrictMode>
);
