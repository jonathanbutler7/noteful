import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useNoteful } from './NotefulContext';
import { useInterval } from './useInterval';

function useCounter() {
  const { count, setCount, setIsRunning, isRunning, toastRoute } = useNoteful();
  const history = useHistory();

  useEffect(() => {
    if (count < 1) {
      setIsRunning(false);
      if (toastRoute !== null) history.push(toastRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useInterval(
    () => {
      setCount(count - 1);
    },
    isRunning ? 1000 : null
  );

  return count > 0 ? count : 0;
}

export default useCounter;
