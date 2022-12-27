import React, { useEffect, useState } from "react";
import TextField from "../components/textField";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        for (const fieldName in data) {
            if (data[fieldName].trim() === "") {
                errors[fieldName] = `${fieldName} field is required`;
            }
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="email"
                value={data.email}
                label="Email"
                onChange={handleChange}
            />
            <TextField
                name="password"
                type="password"
                value={data.password}
                label="Пароль"
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-dark">
                Submit
            </button>
        </form>
    );
};

export default Login;
