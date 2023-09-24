import React, { Fragment, useEffect, useState } from "react";
import "../css/Profile.css";
import "../css/NavBar.css";

const Profile = ({setAuth}) => {
    const [name, setName] = useState("");

    const getProfile = async() => {
        try {
            const result = await fetch("http://localhost:5000/profile", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const data = await result.json();
            setName(data.user_name);
        } catch (error) {
            console.error(error.message);
        }
    };

    const logout = async e => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
        } catch (error) {
            console.error(error.message);
        }
    };
    
    useEffect(() => {
        getProfile();
    }, []);

    return (
        <Fragment>
            <div className="profileBackground">
                <div>
                    <nav className="navbar">
                        <ul>
                            <li><div className="navBox"><a href="/">Home</a></div></li>
                            <li><div className="navBox"><a onClick={e => logout(e)} href="/">Logout</a></div></li>
                        </ul>
                    </nav>
                </div>
                <div className="mainElements">
                    <p className="welcomeMessage">Welcome Mr. {name}</p>
                </div>
            </div>
        </Fragment>
    );
};

export default Profile;
