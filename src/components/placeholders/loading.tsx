import React, { CSSProperties, useEffect, useState } from 'react';

import { useTimeout } from 'utils/use-timeout';

import { LoadingSpinner } from './loading-spinner';

interface Props {
  isThrottled?: boolean;
  style?: CSSProperties;
}

export function Loading(props: Props) {
  const { isThrottled, style } = props;
  return (
    <>
      <style jsx>{`
        div.Loading {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: black;
        }
      `}</style>
      <div style={style} className="Loading">
        {isThrottled ? <ThrottledLoadingSpinner /> : <LoadingSpinner />}
      </div>
    </>
  );
}

function ThrottledLoadingSpinner() {
  const [isShown, setShown] = useState(false);
  const [shownTimeout] = useTimeout(200);

  useEffect(() => {
    shownTimeout(() => setShown(true));
  }, [shownTimeout]);

  if (isShown) {
    return <LoadingSpinner />;
  } else {
    return null;
  }
}
