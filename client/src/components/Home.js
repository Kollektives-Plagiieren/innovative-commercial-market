import React, { useEffect } from "react";
import "../css/Home.css";

import {Wave} from "@foobar404/wave";

const Home = () => {
    useEffect(() => {
        const canvasElement = document.querySelector("canvas");
        const audioElement = document.querySelector("audio");
    
        if (audioElement && canvasElement) {
            const wave = new Wave(audioElement, canvasElement);
            wave.addAnimation(new wave.animations.Lines({
                // lineWidth: 10,
                // lineColor: "red",
                count: 30,
                lineWidth: 1,
                top: 1,
                lineColor: "white"
            }));
        }

        if (audioElement) {
            audioElement.volume = 0.1;
          }
      }, []);

    return (
        <div className="home">
            <h1>Welcome, traveler!</h1>
            <p>
                <span>Emerge in a world full of limitless possibilities, where creativity knows no bounds.</span>
                <span>Welcome to our digital haven, a space crafted by us, for us.</span>
                <span>Explore, create, and inspire with us on this exciting journey.</span>
            </p>
            <canvas id="canvas"></canvas>
            <div id="audio"></div>
            <audio autoPlay loop>
                {/* <source src="audio/in-the-forest-ambient-acoustic-guitar-instrumental-background-music-for-videos-5718.mp3" type="audio/mpeg" /> */}
                {/* <source src="audio/the-introvert-michael-kobrin-10959.mp3" type="audio/mpeg" /> */}
                {/* <source src="audio/smile-relaxing-cinematic-background-piano-music-162112.mp3" type="audio/mpeg" /> */}
                <source src="audio/soft-dreamy-ambient-113221.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default Home;
