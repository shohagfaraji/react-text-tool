import React from "react";
import LogoVid from "../assets/ShiftTextLogo.mp4";
// import LogoGif from "../assets/ShiftTextLogo.gif";

export default function Navbar() {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{ backgroundColor: "#2e003e" }}
            data-bs-theme="dark"
        >
            <div className="container-fluid">
                <a
                    className="navbar-brand d-flex align-items-center me-3"
                    href="#"
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
                </a>
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
                            <a
                                className="btn btn-outline-light"
                                href="#"
                                role="button"
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item me-2">
                            <a
                                className="btn btn-outline-light"
                                href="#"
                                role="button"
                            >
                                About
                            </a>
                        </li>
                        <li className="nav-item me-2">
                            <a
                                className="btn btn-outline-info"
                                href="#"
                                role="button"
                            >
                                Contact
                            </a>
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
