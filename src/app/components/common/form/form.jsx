import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
/* eslint react/prop-types: 0 */
const FormComponent = ({ children, validatorConfig, onSubmit, defaultData }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    useEffect(() => {
        setData(defaultData);
    }, []);

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate();
        }
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const isValid = Object.keys(errors).length === 0;

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
    };

    const clonedElements = React.Children.map(children, (child) => {
        const childType = typeof child.type;
        let config = { ...child.props };
        if (childType === "string") {
            if (child.type === "button") {
                if (
                    child.props.type === "submit" ||
                    child.props.type === undefined
                ) {
                    config = { ...child.props, disabled: !isValid };
                }
            }
        }
        if (childType === "function") {
            config = {
                ...child.props,
                onChange: handleChange,
                value: data[child.props.name] || "",
                error: errors[child.props.name]
            };
        }
        return React.cloneElement(child, config);
    });

    return <form onSubmit={handleSubmit}>{clonedElements}</form>;
};

export default FormComponent;
