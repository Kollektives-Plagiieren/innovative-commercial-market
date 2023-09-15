import React, { useEffect, useState } from "react";

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
        <div>
            <h1 className="text-center my-5">Profile</h1>
            <h2>Welcome {name}</h2>
            <button onClick={e => logout(e)} className="btn btn-primary">Logout</button>
        </div>
    );
};

export default Profile;
