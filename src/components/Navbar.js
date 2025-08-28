import React from "react";
import LogoVid from "../assets/ShiftTextLogo.mp4";
import { Link } from "react-router-dom";
// import LogoGif from "../assets/ShiftTextLogo.gif";

export default function Navbar() {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{ backgroundColor: "#2e003e" }}
            data-bs-theme="dark"
        >
            <div className="container-fluid">
                <Link
                    className="navbar-brand d-flex align-items-center me-3"
                    to="/"
                >
                    {/* <img src= {LogoGif} alt="ShifText" height="40" /> */}
                    <video
                        src={LogoVid}
                        height="40"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ display: "block" }}
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-2">
                            <Link
                                className="btn btn-outline-light"
                                to="/"
                                role="button"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item me-2">
                            <Link
                                className="btn btn-outline-light"
                                to="/about"
                                role="button"
                            >
                                About
                            </Link>
                        </li>
                        <li className="nav-item me-2">
                            <Link
                                className="btn btn-outline-info"
                                to="/contact"
                                role="button"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            className="btn btn-outline-success me-2"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
