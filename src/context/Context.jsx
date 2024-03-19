import React, { createContext, useState } from "react";

const Context = createContext({});

export const ContextProvider = ({ children }) => {
    const [scores, setScores] = useState({
        listening: "",
        reading: "",
        writing: "",
        speaking: "",
    });

    return (
        <Context.Provider value={{ scores, setScores }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
