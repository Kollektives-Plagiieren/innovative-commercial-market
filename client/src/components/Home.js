import React, { useEffect, useState } from "react";
import "../css/Home.css";
import "../css/NavBar.css";

import {Wave} from "@foobar404/wave";

const Home = () => {
    let wave;
    useEffect(() => {
        const canvasElement = document.querySelector("canvas");
        const audioElement = document.querySelector("audio");
    
        if (audioElement && canvasElement) {
          if (!wave) {
            wave = new Wave(audioElement, canvasElement);
            wave.addAnimation(new wave.animations.Lines({
                count: 30,
                lineWidth: 1,
                top: 1,
                lineColor: "white"
            }));

            audioElement.volume = 0.2;
          }
        };
      }, []);

      const checkAuthenticated = async() => {
        try {
          if (localStorage.token) {
            const response = await fetch("http://localhost:5000/verify", {
              method: "POST",
              headers: {token: localStorage.token}
            });

            const result = await response.json();

            result === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error(error.message);
        }
      };
    
      useEffect(() => {
        checkAuthenticated();
      }, []);
    
      const [isAuthenticated, setIsAuthenticated] = useState(false);

      const logout = async e => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
        } catch (error) {
            console.error(error.message);
        }
    };

      return (
        <div className="homeContainer">
            <div>
                <nav className="navbar">
                    <ul>
                        <li><div className="navBox"><a href="/">Home</a></div></li>
                        {isAuthenticated ? (
                          <><li><div className="navBox"><a href="/profile">Profile</a></div></li>
                          <li><div className="navBox"><a onClick={e => logout(e)} href="/">Logout</a></div></li></>
                        ) : (
                          <><li><div className="navBox"><a href="/login">Login</a></div></li>
                          <li><div className="navBox"><a href="/signup">Signup</a></div></li></>
                        )}
                    </ul>
                </nav>
            </div>
            <h1 className="homeHeader">Welcome, traveler!</h1>
            <div className="homeText">
                <p>Emerge in a world full of limitless possibilities, where creativity knows no bounds.</p>
                <p>Welcome to our digital haven, a space crafted by us, for us.</p>
                <p>Explore, create, and inspire with us on this exciting journey.</p>
            </div>
            <canvas id="canvas" className="homeCanvas"></canvas>
            <div id="audio"></div>
            <audio autoPlay loop>
                <source src="/audio/soft-dreamy-ambient-113221.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default Home;
