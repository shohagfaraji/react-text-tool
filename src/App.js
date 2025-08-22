import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <div className="app-wrapper">
                <Navbar />
                <div className="container my-3 main-content">
                    <Textform />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default App;
