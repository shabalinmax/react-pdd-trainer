import React, { useState, useEffect } from 'react';
import './Timer.css'
const Timer = ({seconds, setSeconds}) => {
    const [isActive, setIsActive] = useState(false);
    let minutes = Math.floor(seconds/60)
    let second = seconds - (minutes*60)
    useEffect(() => {
        setIsActive(true)
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <div className="TimerWrapper">
                <div>{minutes < 10 ? '0' + minutes : minutes}:{second < 10 ? '0' + second : second}</div>
        </div>
    );
};

export default Timer;