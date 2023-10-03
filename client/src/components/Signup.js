import React, { Fragment, useState } from "react";
import "../css/Signup.css";

const Signup = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const { email, password, name } = inputs;

    const onChange = e => setInputs({...inputs, [e.target.name]: e.target.value});

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password, name };
            const response = await fetch(
                "http://localhost:5000/signup", {
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
    
    return (
        <Fragment>
            <div className="signupBackground">
                <div>
                    <nav className="navbar">
                        <ul>
                            <li><div className="navBox"><a href="/">Home</a></div></li>
                            <li><div className="navBox"><a href="/login">Login</a></div></li>
                        </ul>
                    </nav>
                </div>
                <div className="signupContainer">
                    <h1 className="signupHeader">Signup</h1>
                    <form onSubmit={onSubmitForm}>
                        <div className="signupInput">
                            <input type="text" name="name" value={name} onChange={e => onChange(e)} required />
                            <label for="">Username</label>
                            <ion-icon name="person-outline"></ion-icon>
                        </div>
                        <div className="signupInput">
                            <input type="text" name="email" value={email} onChange={e => onChange(e)} required />
                            <label for="">Email</label>
                            <ion-icon name="mail-outline"></ion-icon>
                        </div>
                        <div className="signupInput">
                            <input type="password" name="password" value={password}  onChange={e => onChange(e)} required />
                            <label for="">Password</label>
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </div>
                        <button className="signupButton">Sign up</button>
                        <div className="signupLogin">
                            <p>Already signed up? <a href="/login">Log in</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Signup;
