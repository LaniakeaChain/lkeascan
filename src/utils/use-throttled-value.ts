import { useEffect, useRef, useState } from 'react';

export const useThrottledValue = <T>(value: T, limit: number) => {
  const [throttled, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const timeout = limit - (Date.now() - lastRan.current);

    if (timeout > 0) {
      const handler = setTimeout(() => {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }, timeout);

      return () => clearTimeout(handler);
    } else {
      setThrottledValue(value);
      lastRan.current = Date.now();
    }
  }, [value, limit]);

  return throttled;
};
