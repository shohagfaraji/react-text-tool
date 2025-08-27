import React from "react";
import "./About.css";
import LogoGif from "../assets/ShiftTextLogo.gif";

const About = () => {
    return (
        <div className="about-container">
            <h1>About ShiftText</h1>
            <p>
                <strong>ShiftText</strong> is a powerful and user-friendly web
                app designed for quick and easy text transformations. Whether
                you're a student, developer, writer, or just someone working
                with a lot of text, ShiftText offers tools to speed up your
                workflow.
            </p>

            <div className="features-with-gif">
                <div className="features-list">
                    <h2>✨ Features:</h2>
                    <ul>
                        <li>🧾 View live word/character count</li>
                        <li>🔠 Convert text to uppercase/lowercase</li>
                        <li>🆎 Replace specific words</li>
                        <li>• – • Morse code encoding and decoding</li>
                        <li>🔁 Caesar cipher encoding (left/right shift)</li>
                        <li>🔗 Extract links</li>
                        <li>🧼 Remove extra spaces</li>
                        <li>
                            📄 Export text as <code>.txt</code> or PDF
                        </li>
                    </ul>
                </div>

                <div className="gif-right">
                    <img
                        src={LogoGif}
                        alt="App demo gif"
                        className="about-gif"
                    />
                </div>
            </div>

            <h2>👨‍💻 About the Developer</h2>
            <p>
                Developed by{" "}
                <a
                    href="https://github.com/shohagfaraji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                >
                    Shohag Faraji
                </a>{" "}
                in 2025. ShiftText is part of a personal learning and
                productivity toolkit focused on building fast, interactive web
                applications with React.
            </p>
        </div>
    );
};

export default About;
