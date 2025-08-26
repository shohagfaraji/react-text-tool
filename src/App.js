import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import Footer from "./components/Footer";
import Alert from "./components/Alert";

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
            <div className="app-wrapper">
                <Navbar />
                <Alert alert={alert} />
                <div className="container my-3 main-content">
                    <Textform showAlert={showAlert} />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default App;
