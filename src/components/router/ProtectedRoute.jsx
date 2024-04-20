import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
    const role = Cookies.get("role");

    if (role !== "ADMIN") {
        return <Navigate to="/not-found" replace />;
    }

    return children;
};

export default ProtectedRoute;
