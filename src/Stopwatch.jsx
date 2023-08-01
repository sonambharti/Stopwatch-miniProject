import React from 'react';
import { useState, useRef } from 'react';
import './Stopwatch.css';
import RefreshIcon from '@mui/icons-material/Refresh';

function Stopwatch() {

    const startTime = useRef(null);
    const intervalRef = useRef(null);
    const [now, setNow] = useState(null);
    const [stop, setStop] = useState(null);
    const [laps, setLaps] = useState([]);
    const [counter, setCount] = useState(0);
    const [reset, setReset] = useState(false);

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

    function resetStopwatch() {
        setReset(true);
        setLaps([]);
        clearInterval(intervalRef.current);
        setNow(null);
        setStop(null);
        setCount(0);
        startTime.current = null;
    }

    secondsElapsed = (now - startTime.current) / 1000;
  return (
    <div className='stopwatch'>
        
        <div className='main-body'>
        
        <div className='refresh'><RefreshIcon id='refresh' onClick={resetStopwatch} /></div>

            <div className='timer'><h1 className='watch'>{secondsElapsed.toFixed(3)}</h1></div>
            
            <div className='Buttons'>
                <div className='Func-button'>
                    {startTime.current ? (counter === 1) ? (
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
    
            <div className="lap_div"> {laps?.length ? <article>
                <h2>Laps</h2>
                {laps.map((lap) => (
                    <p key={lap}>{lap}</p>
                ))}
            </article>:null}</div>
        </div>
    </div>
  );
}

export default Stopwatch;

// ngrok config add-authtoken 2TNTcOve26wABZZyrNgCVPYvW4x_fJEfVyVcBQmgxXqn2sHy


