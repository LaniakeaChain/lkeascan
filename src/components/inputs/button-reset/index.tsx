import React from 'react';

interface Props {
  isDesktop?: boolean;
  onClick(): void;
}

export function ButtonReset(props: Props) {
  const { isDesktop, onClick } = props;
  return (
    <>
      <style jsx>{`
        div.reset {
          margin-top: 0px;
          text-align: left;
          font-size: ${isDesktop ? 12 : 16}px;
        }
        div.reset button {
          font-size: inherit;
          line-height: 16px;
          cursor: pointer;
        }
      `}</style>
      <div className="reset">
        <button className="--text-link" onClick={onClick}>
          Reset
        </button>
      </div>
    </>
  );
}
