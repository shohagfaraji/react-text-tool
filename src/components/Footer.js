import React from "react";
import LogoGif from "../assets/ShiftTextLogo.gif";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <p style={{ margin: 0 }}>
                    <img src= {LogoGif} alt="ShifText" height="40" className="mx-2"/>
                    &copy; {currentYear} Shohag Faraji. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: "#222",
    color: "#ccc",
    padding: "20px 0",
    marginTop: "40px",
    fontSize: "14px",
    textAlign: "center",
};

const containerStyle = {
    maxWidth: "960px",
    margin: "0 auto",
};

const linkContainerStyle = {
    marginTop: "8px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
};

const linkStyle = {
    color: "#aaa",
    textDecoration: "none",
};

export default Footer;
