import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male"
    });
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;
    const [professions, setProfession] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

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
        },
        profession: {
            isRequired: {
                message: "Профессия обязательна для заполнения"
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
            <SelectField
                name="profession"
                onChange={handleChange}
                options={professions}
                value={data.profession._id}
                label="Выберете вашу профессию"
                defaultOption="Профессия..."
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    {
                        name: "Other",
                        value: "other"
                    }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберете пол"
            />
            <button
                type="submit"
                className="btn btn-dark w-100 mx-auto"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
