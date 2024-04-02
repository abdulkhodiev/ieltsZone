import React from "react";
import { Outlet } from "react-router-dom";

const ExamParticipantsLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default ExamParticipantsLayout;
