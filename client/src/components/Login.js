import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputElement} type="text" name="email" value={email} placeholder="email" onChange={e => onChange(e)} className="form-control my-3" required/>
                <input type="password" name="password" value={password} placeholder="password" onChange={e => onChange(e)} className="form-control my-3" required />
                <button className="btn btn-success btn-block">Log in</button>
            </form>
            <Link to="/signup">Sign up</Link>
        </Fragment>
    );
};

export default Login;
