import React from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

const TextInput = React.forwardRef(function TextInput(props, ref) {
    const { onChange, name, ...other } = props;

    return (
        <IMaskInput
            {...other}
            mask="0000 0000 0000 0000"
            definitions={{
                0: /\d/, // Allow digits 0-9
            }}
            placeholder="0000 0000 0000 0000"
            inputRef={ref}
            onAccept={(value) => {
                if (onChange) {
                    onChange({ target: { name, value } });
                }
            }}
            overwrite
        />
    );
});

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export { TextInput };
