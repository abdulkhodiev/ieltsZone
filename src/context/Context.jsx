import { useState, createContext, useEffect } from "react";
import { getMe, getExams } from "../utils/api/requests/add-exams";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [availableExams, setAvailableExams] = useState([]);

    const userInfo = async () => {
        const userData = await getMe();
        setUserData(userData);
    };

    const getExamInfo = async () => {
        const examInfo = await getExams();
        setAvailableExams(examInfo);
    };

    useEffect(() => {
        userInfo();
        getExamInfo();
    }, []);

    return (
        <DataContext.Provider value={{ userData, availableExams }}>
            {children}
        </DataContext.Provider>
    );
};
