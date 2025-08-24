import React, { useRef, useState } from "react";
import "./TextareaWithCopy.css";
import "../App.css";

export default function Textform() {
    const [mainText, setMainText] = useState("");
    const [text, setText] = useState("");

    const wordsCount = mainText.trim().split(/\s+/).filter(Boolean).length;
    const charCount = mainText.replace(/\s/g, "").length;

    let readingTimeText = "";

    if (wordsCount === 0) {
        readingTimeText = "no time to read";
    } else {
        readingTimeText = (0.008 * wordsCount).toFixed(2) + " minutes to read";
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
        setMainText(event.target.value);
        setShiftCounter(0);
    };

    const changeMainText = () => {
        setMainText(text);
    };

    const changeToUpperCase = () => {
        let newText = mainText.toUpperCase();
        setText(newText);
        setShiftCounter(0);
    };

    const changeToLowerCase = () => {
        let newText = mainText.toLowerCase();
        setText(newText);
        setShiftCounter(0);
    };

    // International Morse Code Mapping
    const morseCodeMap = {
        'A': '.-',     'B': '-...',   'C': '-.-.',   'D': '-..',
        'E': '.',      'F': '..-.',   'G': '--.',    'H': '....',
        'I': '..',     'J': '.---',   'K': '-.-',    'L': '.-..',
        'M': '--',     'N': '-.',     'O': '---',    'P': '.--.',
        'Q': '--.-',   'R': '.-.',    'S': '...',    'T': '-',
        'U': '..-',    'V': '...-',   'W': '.--',    'X': '-..-',
        'Y': '-.--',   'Z': '--..',

        '0': '-----',  '1': '.----',  '2': '..---',  '3': '...--',
        '4': '....-',  '5': '.....',  '6': '-....',  '7': '--...',
        '8': '---..',  '9': '----.',

        '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
        '!': '-.-.--', '/': '-..-.',  '(': '-.--.',  ')': '-.--.-',
        '&': '.-...',  ':': '---...', ';': '-.-.-.',
        '=': '-...-',  '+': '.-.-.',  '-': '-....-', '_': '..--.-',
        '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
        ' ': '/',
    };

    const convertToMorse = () => {
        const upperText = mainText.toUpperCase();
        const morse = upperText
            .split("")
            .map((char) => {
                return morseCodeMap[char] || ""; // Ignore unsupported characters
            })
            .join(" ");
        setText(morse);
    };

    // Caesar Cipher Shift Function
    const [shiftCounter, setShiftCounter] = useState(0); // Shift counter

    const caesarShift = (input, shiftValue) => {
        return input
            .split("")
            .map((char) => {
                const code = char.charCodeAt(0);

                // Uppercase letters
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(
                        ((code - 65 + shiftValue + 26) % 26) + 65
                    );
                }

                // Lowercase letters
                if (code >= 97 && code <= 122) {
                    return String.fromCharCode(
                        ((code - 97 + shiftValue + 26) % 26) + 97
                    );
                }

                // Leave all other characters as is
                return char;
            })
            .join("");
    };

    // Shift Right Handler
    const handleShiftRight = () => {
        const newShift = (shiftCounter + 1) % 26;
        setShiftCounter(newShift);

        setText((prev) => {
            // Remove first line if it's the shift label
            const lines = prev.split("\n");
            const firstLine = lines[0];
            let actualText = prev;

            if (firstLine.startsWith("**Decode: Left shift")) {
                actualText = lines.slice(1).join("\n").trimStart();
            }

            const shifted = caesarShift(actualText, 1);
            if (newShift !== 0) {
                return `**Decode: Left shift ${newShift} ${
                    newShift === 1 ? "time" : "times"
                } (or Right shift ${26 - newShift} ${
                    26 - newShift === 1 ? "time" : "times"
                }) to get the Original text.**\n\n${shifted}`;
            } else {
                return shifted;
            }
        });
    };

    // Shift Left Handler
    const handleShiftLeft = () => {
        const newShift = (shiftCounter - 1 + 26) % 26;
        setShiftCounter(newShift);

        setText((prev) => {
            const lines = prev.split("\n");
            const firstLine = lines[0];
            let actualText = prev;

            if (firstLine.startsWith("**Decode: Left shift")) {
                actualText = lines.slice(1).join("\n").trimStart();
            }

            const shifted = caesarShift(actualText, -1);
            if (newShift !== 0) {
                return `**Decode: Left shift ${newShift} ${
                    newShift === 1 ? "time" : "times"
                } (or Right shift ${26 - newShift} ${
                    26 - newShift === 1 ? "time" : "times"
                }) to get the Original text.**\n\n${shifted}`;
            } else {
                return shifted;
            }
        });
    };

    //Extract links
    const extractLinks = (input) => {
        const str = String(input || "");
        const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
        const matches = str.match(urlRegex);
        return matches ? matches.join("\n\n") : "No links found";
    };

    const handleExtractClick = () => {
        const links = extractLinks(text);
        setText(links);
    };

    const removeExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
    };

    // const copyChangedText = () => {
    //     navigator.clipboard.writeText(text);
    // };

    const clearTextBox = () => {
        setText("");
        setMainText("");
    };

    // copy button
    const textareaRef = useRef(null);
    const previewRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [copiedPreview, setCopiedPreview] = useState(false);

    const handleCopy = () => {
        const text1 = textareaRef.current.value;
        navigator.clipboard.writeText(text1).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 300);
        });
    };

    const handlePreviewCopy = () => {
        const text2 = previewRef.current.innerText;
        navigator.clipboard.writeText(text2).then(() => {
            setCopiedPreview(true);
            setTimeout(() => setCopiedPreview(false), 300);
        });
    };

    return (
        <>
            <div className="container">
                <div className="textarea-wrapper mb-3">
                    <textarea
                        className="form-control my-3 custom-textarea"
                        id="textBox"
                        rows="10"
                        placeholder="Enter your text here..."
                        value={mainText}
                        onChange={handleOnChange}
                        ref={textareaRef}
                    ></textarea>
                    <button className="copy-button" onClick={handleCopy}>
                        {copied ? "♡⸜(˶ᵔ ᵕ ᵔ˶ )⸝" : "copy"}
                    </button>
                </div>
                <div className="button-group">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={changeMainText}
                    >
                        Change Main Text
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={changeToUpperCase}
                    >
                        Convert to Upper Case
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={changeToLowerCase}
                    >
                        Convert to Lower Case
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={convertToMorse}
                    >
                        Convert to Morse Code
                    </button>
                    <button className="btn btn-info" onClick={handleShiftLeft}>
                        Caesar Cipher Left Shift
                    </button>
                    <button className="btn btn-info" onClick={handleShiftRight}>
                        Caesar Cipher Right Shift
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleExtractClick}
                    >
                        Extract Links
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={removeExtraSpaces}
                    >
                        Remove Extra Spaces
                    </button>
                    {/* <button className="btn btn-info " onClick={copyChangedText}>
                        Copy to clipboard
                    </button> */}
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={clearTextBox}
                    >
                        Clear Text
                    </button>
                </div>
            </div>
            <div
                className="container my-3"
                style={{
                    border: "2px solid #2e003e",
                    borderRadius: "10px",
                    padding: "1rem",
                }}
            >
                <h3>Your text summary:</h3>
                <p>
                    {wordsCount} words {charCount} characters. It will take{" "}
                    {readingTimeText}.
                </p>
                {wordsCount > 0 && <h3>Preview</h3>}
                <div
                    className="container textarea-wrapper my-3"
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
                    {wordsCount > 0 && (
                        <button
                            className="copy-button"
                            onClick={handlePreviewCopy}
                        >
                            {copiedPreview ? "♡⸜(˶ᵔ ᵕ ᵔ˶ )⸝" : "copy"}
                        </button>
                    )}
                    <p id="changedText" ref={previewRef}>
                        {text}
                    </p>
                </div>
            </div>
        </>
    );
}
