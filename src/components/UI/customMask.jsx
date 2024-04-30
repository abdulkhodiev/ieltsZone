import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

const TextInput = React.forwardRef(function TextInput(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="0000 0000 0000 0000"
            definitions={{
                "#": /[1-16]/,
            }}
            placeholder={"0000 0000 0000 0000"}
            inputRef={ref}
            onAccept={useCallback((value) =>
                onChange({ target: { name: props.name, value } })
            )}
            overwrite
        />
    );
});

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export { TextInput };
