import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";
import EditUserPage from "../components/page/editUserPage";

const Login = () => {
    const { type, userId } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    if (type === "edit" && userId) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h3 className="mb-4">Edit</h3>
                        <EditUserPage/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Register</h3>
                            <RegisterForm />
                            <p>
                                Already have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Sign In
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p>
                                Dont have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Sign Up
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
