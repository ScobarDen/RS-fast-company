import React, { useState } from "react";
import TextField from "../components/textField";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };
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
