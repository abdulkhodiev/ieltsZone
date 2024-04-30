import { useState, createContext, useEffect } from "react";
import { getMe, getExams } from "../utils/api/requests/add-exams";
import { format } from "date-fns";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [availableExams, setAvailableExams] = useState([]);

    const userInfo = async () => {
        const userData = await getMe();
        setUserData(userData);
    };

    const getExamInfo = async () => {
        const res = await getExams();

        const formattedExams = res.map((exam) => ({
            ...exam,
            examDateTime: format(new Date(exam.examDateTime), "MMMM do yyyy"),
        }));
        setAvailableExams(formattedExams);
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
