import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;

    const validate = () => {
        const errors = validator(data, validatorConfig);
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

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapital: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isDigit: {
                message: "Пароль должен содержать хотя-бы одну цифру"
            },
            min: {
                message: `Пароль должен состоять минимум из 8 символов`,
                value: 8
            }
        }
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
                error={errors.email}
            />
            <TextField
                name="password"
                type="password"
                value={data.password}
                label="Пароль"
                onChange={handleChange}
                error={errors.password}
            />
            <button type="submit" className="btn btn-dark" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

export default Login;
