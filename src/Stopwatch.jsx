import React from 'react';
import { useState, useRef } from 'react';

function Stopwatch() {

    const startTime = useRef(null);
    const intervalRef = useRef(null);
    const [now, setNow] = useState(null);
    let secondsElapsed = 0;


    function startStopwatch(){
        startTime.current = Date.now();
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10);
    }

    function stopStopwatch(){
        clearInterval(intervalRef.current);
    }


    secondsElapsed = (now - startTime.current) / 1000;
  return (
    <section>
        <h1>{secondsElapsed.toFixed(3)}</h1>
        <button onClick={startStopwatch}>Start</button>
        <button onClick={stopStopwatch}>Stop</button>
    </section>
  );
}

export default Stopwatch;