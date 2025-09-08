import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import About from "./components/About";
import Contact from "./components/Contact";
import Textform from "./components/Textform";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type,
        });

        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };

    return (
        <>
            <Router>
                <div className="app-wrapper">
                    <Navbar />
                    <Alert alert={alert} />
                    <div className="container my-3 main-content">
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={<Textform showAlert={showAlert} />}
                            />
                            <Route exact path="/timer" element={<Timer />} />
                            <Route exact path="/about" element={<About />} />
                            <Route
                                exact
                                path="/contact"
                                element={<Contact />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </>
    );
}

export default App;
