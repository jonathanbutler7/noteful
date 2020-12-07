import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useNoteful } from '../../NotefulContext';
import { useInterval } from '../../useInterval';

function Counter() {
  const { count, setCount, setIsRunning, isRunning } = useNoteful();
  const history = useHistory();

  useEffect(() => {
    console.log(count);
    if (count < 1) {
      setIsRunning(false);
      if (history.pathname !== '/') {
        history.push('/');
      }
    }
  }, [count]);

  useInterval(
    () => {
      setCount(count - 1);
    },
    isRunning ? 1000 : null
  );

  return (
    <>
      {/* <button onClick={() => restart()}>do it again</button> */}
      <p>{count !== 0 && count}</p>
    </>
  );
}

export default Counter;
