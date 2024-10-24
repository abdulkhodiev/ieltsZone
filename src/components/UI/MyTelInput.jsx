import React from "react";
import { MuiTelInput } from "mui-tel-input";

const MyTelInput = ({ value, onChange }) => {
    return (
        <MuiTelInput
            style={{ marginBottom: "1rem" }}
            onlyCountries={["UZ"]}
            defaultCountry="UZ"
            fullWidth
            required
            value={value}
            onChange={onChange}
            inputProps={{ maxLength: 17 }}
        />
    );
};

export default MyTelInput;
