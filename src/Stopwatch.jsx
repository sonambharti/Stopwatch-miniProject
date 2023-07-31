import React from 'react';
import { useState, useRef } from 'react';
import './Stopwatch.css';

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
    <section className='stopwatch'>
        <h1 lassName='watch'>{secondsElapsed.toFixed(3)}</h1>
        <div className='Buttons'>
            <button className='start' onClick={startStopwatch}>Start</button>
            <button className='stop' onClick={stopStopwatch}>Stop</button>
        </div>
    </section>
  );
}

export default Stopwatch;