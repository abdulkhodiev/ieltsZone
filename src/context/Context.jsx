import React, { createContext, useState, useContext, useEffect } from "react";

const Context = createContext({
    role: "",
    setRole: () => {},
});

export const ContextProvider = ({ children }) => {
    const [role, setRole] = useState("");

    return (
        <Context.Provider value={{ role, setRole }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
