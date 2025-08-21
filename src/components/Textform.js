import React, { useState } from "react";

export default function Textform() {
    const [text, setText] = useState("");

    const wordsCount = text.trim().split(/\s+/).filter(Boolean).length;
    const charCount = text.replace(/\s/g, "").length;

    let readingTimeText = "";

    if (wordsCount === 0) {
        readingTimeText = "no time to read";
    } else {
        readingTimeText = (0.008 * wordsCount).toFixed(2) + " minutes to read";
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const changeToUpperCase = () => {
        let newText = text.toUpperCase();
        setText(newText);
    };

    const changeToLowerCase = () => {
        let newText = text.toLowerCase();
        setText(newText);
    };

    const clearTextBox = () => {
        setText("");
    };

    return (
        <>
            <div className="container">
                <div className="mb-3">
                    <textarea
                        className="form-control my-3"
                        id="textBox"
                        rows="10"
                        placeholder="Enter your text here..."
                        value={text}
                        onChange={handleOnChange}
                    ></textarea>
                </div>

                <button className="btn btn-primary" onClick={changeToUpperCase}>
                    Convert to Upper Case
                </button>
                <button
                    className="btn btn-primary mx-2"
                    onClick={changeToLowerCase}
                >
                    Convert to Lower Case
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={clearTextBox}
                >
                    Clear Text
                </button>
            </div>
            <div
                className="container my-3"
                style={{
                    border: "2px solid #2e003e",
                    borderRadius: "10px",
                    padding: "1rem",
                }}
            >
                {/* <h1 style={{ borderStyle: "solid", borderColor: "#2e003e" }}> */}
                <h3>Your text summary:</h3>
                <p>
                    {wordsCount} words {charCount} characters. It will take{" "}
                    {readingTimeText}.
                </p>
                <h3>Preview</h3>
                <div
                    className="container my-3"
                    style={
                        wordsCount > 0
                            ? {
                                  border: "2px solid #615debff",
                                  borderRadius: "10px",
                                  padding: "1rem",
                                  whiteSpace: "pre-wrap",
                              }
                            : {}
                    }
                >
                    <p>{text}</p>
                </div>
            </div>
        </>
    );
}
