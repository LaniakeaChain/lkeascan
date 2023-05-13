import React from 'react';

import { ICON } from 'components/svg';

export function CancelCircle(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <style jsx>{`
        button.CancelCircle {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
      <button className="CancelCircle" {...props}>
        {ICON.CancelCircle}
      </button>
    </>
  );
}
