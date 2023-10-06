import React, { Fragment, useState } from "react";
import "../css/Signup.css";
import {Alert, AlertTitle, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Signup = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        retypedPassword: "",
        name: ""
    });

    const { email, password, retypedPassword, name } = inputs;
    const onChange = e => setInputs({...inputs, [e.target.name]: e.target.value});

    const [isWarningShown, setIsWarningShown] = useState(false);
    const [iconName, setIconName] = useState("eye-off-outline");
    const [isPassVisible, setIsPassVisible] = useState(false);

    const handleClickShowPassword = () => {
        // handles the state when mouse is over the icon and a click occur, but varaible has not changed yet
        setIconName(!isPassVisible ? "eye" : "eye-off");
        setIsPassVisible(!isPassVisible);
    }
    const changeIconSolid = () => setIconName(isPassVisible ? "eye" : "eye-off");
    const changeIconRegular = () => setIconName(isPassVisible ? "eye-outline" : "eye-off-outline");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            if (password !== retypedPassword){
               setIsWarningShown(true);
            } else {
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
                {isWarningShown ? 
                <Alert variant="filled" severity="warning"
                    action={
                        <IconButton aria-label="close" color="inherit" size="small"
                            onClick={() => setIsWarningShown(false)}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                  }>
                    <AlertTitle>Warning</AlertTitle>
                    <strong>Passwords do not match! Please type the same passwords!</strong></Alert> : <></>}
                <div className="signupContainer">
                    <h1 className="signupHeader">Signup</h1>
                    <form onSubmit={onSubmitForm}>
                        <div className="signupInput">
                            <input id="usernameInputId" type="text" name="name" value={name} onChange={e => onChange(e)} required />
                            <label htmlFor="usernameInputId">Username</label>
                            <ion-icon name="person-outline"></ion-icon>
                        </div>
                        <div className="signupInput">
                            <input id="emailInputId" type="text" name="email" value={email} onChange={e => onChange(e)} required />
                            <label htmlFor="emailInputId">Email</label>
                            <ion-icon name="mail-outline"></ion-icon>
                        </div>
                        <div className="signupInput">
                            <input id="passInputId" type={isPassVisible ? "text" : "password"} name="password" value={password} onChange={e => onChange(e)} required />
                            <label htmlFor="passInputId">Password</label>
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </div>
                        <div className="signupInput">
                            <input id="retypePassInputId" type={isPassVisible ? "text" : "password"} name="retypedPassword" value={retypedPassword} onChange={e => onChange(e)} required />
                            <label htmlFor="retypePassInputId">Retype password</label>
                            <ion-button shape="round" aria-label="show-password-btn" onClick={handleClickShowPassword}>
                                <ion-icon name={iconName} title="Show password" onMouseEnter={changeIconSolid}
                                onMouseLeave={changeIconRegular}></ion-icon>
                            </ion-button>
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
