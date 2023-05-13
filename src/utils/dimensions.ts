import { useCallback, useEffect, useState } from 'react';

import { DESKTOP_WIDTH, HEADER_HEIGHT, TABLET_WIDTH } from 'data/data-style';

interface Dimensions {
  width: number;
  height: number;
}

export const containerHeight = (dimensionsConfig: Dimensions) =>
  dimensionsConfig.height - HEADER_HEIGHT;

export function useWindowSize(): Dimensions {
  const isClient = typeof window === 'object';

  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }),
    [isClient],
  );

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize]);

  return windowSize;
}

export function useIsDesktop() {
  const { width } = useWindowSize();
  return width > DESKTOP_WIDTH;
}

export function useIsTablerOrGreater() {
  const { width } = useWindowSize();
  return width > TABLET_WIDTH;
}
