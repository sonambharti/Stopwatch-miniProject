import React from 'react';
import { useState, useRef } from 'react';
import './Stopwatch.css';

function Stopwatch() {

    const startTime = useRef(null);
    const intervalRef = useRef(null);
    const [now, setNow] = useState(null);
    const [stop, setStop] = useState(null);
    const [laps, setLaps] = useState([]);
    const [counter, setCount] = useState(0);

    let secondsElapsed = 0;


    function startStopwatch(){
        startTime.current = Date.now();
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10);
        // console.log("In start " + intervalRef.current);
    }

    function stopStopwatch(){
        setStop(Date.now());
        clearInterval(intervalRef.current);
        // console.log("In stop " + intervalRef.current);
        setCount(1);
    }

    function resumeStopwatch(){
        startTime.current +=  Date.now() - stop;
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10);
        // console.log("In resume " + intervalRef.current);
        setCount(0);
    }


    function trackLap() {
        setLaps([...laps, secondsElapsed]);
    }


    secondsElapsed = (now - startTime.current) / 1000;
  return (
    <div className='stopwatch'>
    <section>
        <h1 className='watch'>{secondsElapsed.toFixed(3)}</h1>
        <div className='Buttons'>
            <div>
                {startTime.current ? (counter == 1) ? (
                    <button id='resume' onClick={ (e) => {
                        e.preventDefault();
                        resumeStopwatch();
                    }}>
                       Resume </button>
                ) : (
                    <button id='stop' onClick={ (e) => {
                        e.preventDefault();
                        stopStopwatch();
                    }}>
                       Stop </button>
                ) :
                    (
                    <button id='start' onClick={ (e) => {
                        e.preventDefault();
                        startStopwatch();
                    }}>
                       Start </button>
                )
                }
            
            </div>
        
            {/* <button id='stop' onClick={stopStopwatch} > Stop </button> */}
            <button id='lap' onClick={trackLap} > Lap </button>
            
        </div>
    </section>
    {laps?.length ? <div className="lap_div"><article>
        <h2>Laps</h2>
        {laps.map((lap) => (
            <p key={lap}>{lap}</p>
        ))}
    </article></div>:null}
    </div>
  );
}

export default Stopwatch;