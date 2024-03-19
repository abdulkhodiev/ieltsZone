import Context from "../context/Context";
import { useContext } from "react";

export const globalContext = () => {
    return useContext(Context);
};
