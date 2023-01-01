import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import SelectField from "./selectField";

const MultiSelectField = ({ onChange, options, name }) => {
    const optionsArray =
        !Array.isArray(value) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    return (
        <Select
            isMulti
            name={name}
            options={optionsArray}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onChange}
        />
    );
};
SelectField.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string
};
export default MultiSelectField;
