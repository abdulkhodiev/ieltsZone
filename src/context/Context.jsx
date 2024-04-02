import React, { createContext, useState, useEffect } from "react";

const Context = createContext({});

export const ContextProvider = ({ children }) => {
    const [scores, setScores] = useState({
        listening: "",
        reading: "",
        writing: "",
        speaking: "",
        BandScore: 0,
    });

    useEffect(() => {
        const { listening, reading, writing, speaking } = scores;

        const total = [listening, reading, writing, speaking].reduce(
            (acc, current) => acc + parseFloat(current || 0),
            0
        );
        const BandScore =
            scores.listening &&
            scores.reading &&
            scores.writing &&
            scores.speaking
                ? total / 4
                : 0;

        setScores((prevScores) => ({ ...prevScores, BandScore }));
    }, [scores.listening, scores.reading, scores.writing, scores.speaking]);

    return (
        <Context.Provider value={{ scores, setScores }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
