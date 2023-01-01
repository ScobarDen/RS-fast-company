import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
    defaultOption,
    error
}) => {
    const optionsArray =
        !Array.isArray(value) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor="profession" className="form-label">
                {label}
            </label>
            <select
                className={`form-select is-${error ? "invalid" : "valid"}`}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option value="" disabled>
                    {defaultOption}
                </option>
                {options &&
                    optionsArray.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string,
    defaultOption: PropTypes.string
};

export default SelectField;
