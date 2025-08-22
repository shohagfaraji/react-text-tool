import React, {useRef, useState } from "react";
import './TextareaWithCopy.css';


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
    };

    const changeMainText = () => {
        setMainText(text);
    };

    const changeToUpperCase = () => {
        let newText = mainText.toUpperCase();
        setText(newText);
    };

    const changeToLowerCase = () => {
        let newText = mainText.toLowerCase();
        setText(newText);
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
        const morse = upperText.split('').map(char => {
            return morseCodeMap[char] || ''; // Ignore unsupported characters
        }).join(' ');
        setText(morse);
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
                    <button className="copy-button" onClick={handleCopy}>{copied ? '♡⸜(˶ᵔ ᵕ ᵔ˶ )⸝' : 'copy'}</button>
                </div>
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={changeMainText}
                >
                    Change Main Text
                </button>
                <button
                    className="btn btn-primary mx-2"
                    onClick={changeToUpperCase}
                >
                    Convert to Upper Case
                </button>
                <button className="btn btn-primary" onClick={changeToLowerCase}>
                    Convert to Lower Case
                </button>
                <button className="btn btn-primary mx-2" onClick={convertToMorse}>
                    Convert to Morse Code
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
                    className="btn btn-danger mx-2"
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
                <h3>Your text summary:</h3>
                <p>
                    {wordsCount} words {charCount} characters. It will take{" "}
                    {readingTimeText}.
                </p>
                {wordsCount > 0 && (<h3>Preview</h3>)}   
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
                    <button className="copy-button" onClick={handlePreviewCopy}>
                        {copiedPreview ? '♡⸜(˶ᵔ ᵕ ᵔ˶ )⸝' : 'copy'}
                    </button>
                    )}           
                    <p id="changedText" ref={previewRef}>{text}</p>
                </div>
            </div>
        </>
    );
}