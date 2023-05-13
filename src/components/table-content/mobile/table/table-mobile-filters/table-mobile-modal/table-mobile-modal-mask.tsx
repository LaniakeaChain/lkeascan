import React, { CSSProperties } from 'react';

interface Props {
  style: CSSProperties;
}

export function TableMobileModalMask({ style }: Props) {
  return (
    <>
      <style jsx>{`
        div.mask {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }
      `}</style>
      <div style={style} className="mask" />
    </>
  );
}
