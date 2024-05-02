import { Grow } from "@mui/material";
import { Outlet } from "react-router-dom";

const ExamParticipantsLayout = () => {
    return (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={500}>
            <div>
                <Outlet />
            </div>
        </Grow>
    );
};

export default ExamParticipantsLayout;
