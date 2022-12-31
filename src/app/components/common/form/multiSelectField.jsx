import React from "react";
import Select from "react-select";

const MultiSelectField = () => {
    return <Select
        isMulti
        name="colors"
        options={}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
    />;
};

export default MultiSelectField;
