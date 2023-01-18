import React, { useCallback, useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
/* eslint react/prop-types: 0 */
const FormComponent = ({
    children,
    validatorConfig,
    onSubmit,
    defaultData
}) => {
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
    const handleChange = useCallback(
        (target) => {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        },
        [setData]
    );
    const isValid = Object.keys(errors).length === 0;

    const validate = useCallback(
        (data) => {
            const errors = validator(data, validatorConfig);
            setErrors(errors);
            return Object.keys(errors).length === 0;
        },
        [validatorConfig, setErrors]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate(data);
        if (!isValid) return;
        onSubmit(data);
    };

    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            const form = event.target.form;
            const indexOfField = Array.prototype.indexOf.call(
                form,
                event.target
            );
            form.elements[indexOfField + 1].focus();
        }
    }, []);

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
        if (childType === "object") {
            config = {
                ...child.props,
                onChange: handleChange,
                value: data[child.props.name] || "",
                error: errors[child.props.name],
                onKeyDown: handleKeyDown
            };
        }
        return React.cloneElement(child, config);
    });

    return <form onSubmit={handleSubmit}>{clonedElements}</form>;
};

export default FormComponent;
