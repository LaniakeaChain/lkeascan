import { useEffect } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */

export function useAsyncEffect(effect: () => Promise<void | (() => void)>, dependencies?: any[]) {
  return useEffect(() => {
    const cleanupPromise = effect();

    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, dependencies);
}
