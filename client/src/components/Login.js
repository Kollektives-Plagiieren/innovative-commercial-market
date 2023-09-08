import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

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
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    },
                    body: JSON.stringify(body)
                }
            );

            const result = await response.json();

            if (result.jwtToken) {
                localStorage.setItem("jwt_token", result.jwtToken);
                setAuth(true);
                toast.success("Login successful");
            } else {
                setAuth(false);
                toast.error(result);
            }
        } catch (error) {
        console.error(error.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="email" value={email} onChange={e => onChange(e)} className="form-control my-3" />
                <input type="password" name="password" value={password} onChange={e => onChange(e)} className="form-control my-3" />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/signup">Sign up</Link>
        </Fragment>
    );
};

export default Login;
