import { useCallback, useEffect, useRef } from 'react';

/* Note that the previous timeout will be cleared when the callback is executed */
export const useTimeout = (delay: number): [(callback: () => void) => void, () => void] => {
  const timeoutRef = useRef<number>();

  useEffect(() => () => clearTimeout(timeoutRef.current), [timeoutRef]);

  const timeout = useCallback(
    <T extends []>(callback: (...args: T) => void) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(callback, delay);
    },
    [delay],
  );

  const clear = useCallback(() => clearTimeout(timeoutRef.current), []);

  return [timeout, clear];
};
