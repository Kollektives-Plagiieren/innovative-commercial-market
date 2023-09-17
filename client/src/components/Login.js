import React, { Fragment, useEffect, useRef, useState } from "react";
import "../css/Login.css";

const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch(
                "http://localhost:5000/login", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const result = await response.json();

            if (result.token) {
                localStorage.setItem("token", result.token);
                setAuth(true);
            } else {
                setAuth(false);
            }
        } catch (error) {
        console.error(error.message);
        }
    };

    // Autofocus to the email input field
    const inputElement = useRef(null);
    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, []);

    return (
        <Fragment>
            <div className="loginBackground">
                <div className="loginContainer">
                    <h1 className="loginHeader">Login</h1>
                    <form onSubmit={onSubmitForm} className="loginForm">
                        <div className="loginInput">
                            <label for="">Email</label>
                            <input ref={inputElement} type="email" name="email" value={email} onChange={e => onChange(e)} required />
                            <ion-icon name="mail-outline"></ion-icon>
                        </div>
                        <div className="loginInput">
                            <label for="">Password</label>
                            <input type="password" name="password" value={password} onChange={e => onChange(e)} required />
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </div>
                        <div className="forget">
                            <label for=""><input type="checkbox"></input></label>
                            <span>Remember me</span>
                            <a href="#">Forgot your password?</a>
                        </div>
                        <button className="loginButton">Log in</button>
                        <div className="loginSignup">
                            <p>Don't have an account? <a href="/signup">Sign up</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
