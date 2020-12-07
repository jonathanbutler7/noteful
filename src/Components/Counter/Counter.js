import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useNoteful } from '../../NotefulContext';
import { useInterval } from '../../useInterval';

function Counter() {
  const { count, setCount, setIsRunning, isRunning } = useNoteful();
  const history = useHistory();

  useEffect(() => {
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

  return count > 0 ? count : 0;
}

export default Counter;
