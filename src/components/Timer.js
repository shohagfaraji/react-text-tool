import React, { useState, useEffect, useRef } from "react";
import ryukSound from "../assets/ryuk.mp3";
import warningSound from "../assets/warn.mp3";

export default function Timer() {
    const [hour, setHour] = useState(() => {
        const now = new Date();
        const defaultDate = new Date(now.getTime() + 3600000);
        return defaultDate.getHours();
    });

    const [minute, setMinute] = useState(() => {
        const now = new Date();
        const defaultDate = new Date(now.getTime() + 3600000);
        return defaultDate.getMinutes();
    });

    const [showPopup, setShowPopup] = useState(true);
    const [endTime, setEndTime] = useState(null);
    const [warnings, setWarnings] = useState([600]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [alarmPlayed, setAlarmPlayed] = useState({});
    const [isIncrementMode, setIsIncrementMode] = useState(true);
    const [totalDuration, setTotalDuration] = useState(null);

    const percentRemaining = totalDuration
        ? (timeLeft / totalDuration) * 100
        : 100;

    useEffect(() => {
        let interval = null;
        if (endTime) {
            interval = setInterval(() => {
                const now = new Date();
                const diff = Math.floor((endTime - now) / 1000);
                setTimeLeft(diff > 0 ? diff : 0);

                warnings.forEach((warn) => {
                    if (diff === warn && !alarmPlayed[warn]) {
                        playAlarm(true); // warning tone
                        setAlarmPlayed((prev) => ({ ...prev, [warn]: true }));
                    }
                });

                if (diff <= 0 && !alarmPlayed.end) {
                    playAlarm(); // final alarm
                    setAlarmPlayed((prev) => ({ ...prev, end: true }));
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [endTime, warnings, alarmPlayed]);

    // Updates the document title with the countdown
    useEffect(() => {
        if (endTime && timeLeft > 0) {
            document.title = `⏳ ${formatTime(timeLeft)}`;
        } else if (endTime && timeLeft === 0) {
            document.title = "⏰ Time's up!";
        } else {
            document.title = "Timer";
        }
    }, [timeLeft, endTime]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (endTime) {
                e.preventDefault();
                e.returnValue = ""; // Required for Chrome to show confirmation
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [endTime]);

    const finalAudioRef = useRef(null);
    const warningAudioRef = useRef(null);

    useEffect(() => {
        finalAudioRef.current = new Audio(ryukSound);
        finalAudioRef.current.load();

        warningAudioRef.current = new Audio(warningSound);
        warningAudioRef.current.load();
    }, []);

    const playAlarm = (isWarning = false) => {
        const audioRef = isWarning ? warningAudioRef : finalAudioRef;

        if (audioRef.current) {
            const audio = audioRef.current.cloneNode(); // Allow overlapping + safe reuse
            audio.currentTime = 0;
            audio.play().catch((error) => {
                console.error("⚠️ Audio playback failed:", error);
            });
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        return [h, m, s].map((t) => String(t).padStart(2, "0")).join(":");
    };

    const toggleAmPm = () => {
        setHour((prevHour) => (prevHour >= 12 ? prevHour - 12 : prevHour + 12));
    };

    return (
        <div style={{ padding: 20, textAlign: "center" }}>
            {showPopup ? (
                <SetTimerPopup
                    hour={hour}
                    minute={minute}
                    isIncrementMode={isIncrementMode}
                    setHour={setHour}
                    setMinute={setMinute}
                    toggleAmPm={toggleAmPm}
                    isPM={hour >= 12}
                    setIsIncrementMode={setIsIncrementMode}
                    setEndTime={setEndTime}
                    setWarnings={setWarnings}
                    setAlarmPlayed={setAlarmPlayed}
                    setShowPopup={setShowPopup}
                    setTotalDuration={setTotalDuration}
                    setTimeLeft={setTimeLeft}
                />
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "70vh",
                            textAlign: "center",
                        }}
                    >
                        {totalDuration && (
                            <div
                                style={{
                                    width: "100%",
                                    maxWidth: 600,
                                    margin: "0 auto",
                                    marginBottom: 20,

                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        flex: 1,
                                        height: "10px",
                                        backgroundColor: "#e0e0e0",
                                        borderRadius: "5px",
                                        overflow: "hidden",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${percentRemaining}%`,
                                            height: "100%",
                                            backgroundColor:
                                                percentRemaining > 50
                                                    ? "#4caf50"
                                                    : percentRemaining > 20
                                                    ? "#ff9800"
                                                    : "#f44336",
                                            transition: "width 1s linear",
                                        }}
                                    />
                                </div>
                                {/* Percentage label */}
                                <div
                                    style={{
                                        minWidth: "40px",
                                        fontWeight: "bold",
                                        color:
                                            percentRemaining > 50
                                                ? "#4caf50"
                                                : percentRemaining > 20
                                                ? "#ff9800"
                                                : "#f44336",
                                        userSelect: "none",
                                        fontFamily: "Arial, sans-serif",
                                    }}
                                >
                                    {percentRemaining.toFixed(0)}%
                                </div>
                            </div>
                        )}
                        <div
                            style={{
                                fontSize: "12vw",
                                fontWeight: "bold",
                                color: "#222222",
                                textShadow: `
                                    0 0 2px rgba(255,255,255,0.8),
                                    0 0 6px rgba(160,32,240,0.3)
                                `,

                                letterSpacing: "0.1em",
                                lineHeight: 1.1,
                                userSelect: "none",
                            }}
                        >
                            {formatTime(timeLeft)}
                        </div>
                        <div style={{ marginTop: "40px" }}>
                            <button
                                className="btn btn-warning me-3"
                                onClick={() => setShowPopup(true)}
                            >
                                Reset Timer
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    setEndTime(null);
                                    setTimeLeft(0);
                                    setAlarmPlayed({});
                                    document.title = "Timer";
                                }}
                            >
                                Stop Timer
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function SetTimerPopup({
    hour,
    minute,
    isIncrementMode,
    setHour,
    setMinute,
    toggleAmPm,
    isPM,
    setIsIncrementMode,
    setEndTime,
    setWarnings,
    setAlarmPlayed,
    setShowPopup,
    setTotalDuration,
    setTimeLeft,
}) {
    const [warningTimes, setWarningTimes] = useState([600]);
    const [isRemoveMode, setIsRemoveMode] = useState(false);

    const get12Hour = () => {
        const h = hour % 12;
        return h === 0 ? 12 : h;
    };

    const handleStart = () => {
        const target = new Date();
        target.setHours(hour);
        target.setMinutes(minute);
        target.setSeconds(0);
        target.setMilliseconds(0);

        if (target <= new Date()) {
            target.setDate(target.getDate() + 1);
        }

        setEndTime(target);
        setWarnings(warningTimes);
        setAlarmPlayed({});
        setIsRemoveMode(false); // Exit remove mode
        setShowPopup(false);

        const now = new Date();
        const durationInSeconds = Math.floor((target - now) / 1000);
        setTotalDuration(durationInSeconds);
        setTimeLeft(durationInSeconds);
    };

    // const updateWarning = (index, value) => {
    //     const updated = [...warningTimes];
    //     updated[index] = Math.max(10, updated[index] + value);
    //     setWarningTimes(updated);
    // };

    // const handleWarningChange = (index, value) => {
    //     const updated = [...warningTimes];
    //     updated[index] = Math.max(10, Number(value) * 60);
    //     setWarningTimes(updated);
    // };

    const handleAddWarning = () => {
        setWarningTimes([...warningTimes, 300]);
    };

    return (
        <div className="replace-popup">
            <div className="popup-inner text-center">
                <h4>Set End Time</h4>

                <div className="d-flex justify-content-around my-3 align-items-center">
                    <button
                        className="btn btn-outline-primary text-center"
                        style={{
                            width: "70px",
                            height: "70px",
                            fontSize: "20px",
                        }}
                        onClick={() =>
                            setHour(
                                (prev) =>
                                    (prev + (isIncrementMode ? 1 : -1) + 24) %
                                    24
                            )
                        }
                    >
                        {get12Hour()}
                        <div style={{ fontSize: "12px" }}>Hours</div>
                    </button>

                    <button
                        className="btn btn-outline-primary text-center"
                        style={{
                            width: "70px",
                            height: "70px",
                            fontSize: "20px",
                        }}
                        onClick={() =>
                            setMinute(
                                (prev) =>
                                    (prev + (isIncrementMode ? 1 : -1) + 60) %
                                    60
                            )
                        }
                    >
                        {minute.toString().padStart(2, "0")}
                        <div style={{ fontSize: "12px" }}>Minutes</div>
                    </button>

                    <button
                        className={`btn btn-outline-${
                            isPM ? "dark" : "dark"
                        } text-center`}
                        onClick={toggleAmPm}
                        style={{
                            width: "70px",
                            height: "70px",
                            fontSize: "20px",
                        }}
                    >
                        {isPM ? "PM" : "AM"}
                    </button>
                </div>

                <div className="text-center mt-3">
                    <button
                        style={{
                            width: "240px",
                            height: "40px",
                            fontSize: "16px",
                            backgroundColor: isIncrementMode
                                ? "#4CAF50"
                                : "#E74C3C",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                        }}
                        onClick={() => setIsIncrementMode((prev) => !prev)}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                isIncrementMode ? "#45a049" : "#c0392b")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                isIncrementMode ? "#4CAF50" : "#E74C3C")
                        }
                    >
                        {isIncrementMode ? "Mode: Increase" : "Mode: Decrease"}
                    </button>
                </div>

                <hr />

                <div>
                    <strong>Warning Alarms</strong>
                    <br /> <p>(minutes before end)</p>
                    <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                        {warningTimes.map((w, i) => (
                            <button
                                key={i}
                                className={`btn ${
                                    isRemoveMode
                                        ? "btn-danger"
                                        : "btn-outline-secondary"
                                }`}
                                onClick={() => {
                                    if (isRemoveMode) {
                                        // Remove the warning
                                        setWarningTimes((prev) =>
                                            prev.filter(
                                                (_, index) => index !== i
                                            )
                                        );
                                    } else {
                                        // Modify the warning by +5/-5 minutes
                                        const updated = [...warningTimes];
                                        const delta = isIncrementMode
                                            ? 300
                                            : -300;
                                        updated[i] = Math.max(
                                            300,
                                            updated[i] + delta
                                        );
                                        setWarningTimes(updated);
                                    }
                                }}
                            >
                                ⏰ {Math.floor(w / 60)} min
                            </button>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center gap-3 mt-3">
                        <button
                            className="btn btn-info"
                            onClick={handleAddWarning}
                        >
                            + Add Warning
                        </button>
                        <button
                            className={`btn ${
                                isRemoveMode
                                    ? "btn-outline-danger"
                                    : "btn-danger"
                            }`}
                            onClick={() => setIsRemoveMode((prev) => !prev)}
                        >
                            {isRemoveMode
                                ? "Cancel Remove"
                                : "🗑️ Remove Warning"}
                        </button>
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-success" onClick={handleStart}>
                        Start Timer
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setShowPopup(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
