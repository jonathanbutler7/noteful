import React, { useState, useRef, useEffect } from 'react';
import { useNoteful } from '../../NotefulContext';

export function useInterval(callback, delay) {
  
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Counter() {
//   const { count, setCount, running, setIsRunning, isRunning } = useNoteful();
  const [isRunning, setIsRunning] = useState(true);
  const [count, setCount] = useState(3);
  console.log(count);

  useEffect(() => {
    if (count === 0) {
      setIsRunning(false);
    }
  }, [count]);

  useInterval(
    () => {
      setCount(count - 1);
    },
    isRunning ? 1000 : null
  );

  function restart() {
      setIsRunning(true);
      setCount(3)
  }

  

  return (
    <>
      <button onClick={() => restart()}>do it again</button>
      <p>{count !== 0 && count}</p>
    </>
  );
}

export default Counter;
