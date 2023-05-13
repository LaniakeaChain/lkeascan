import React from 'react';

interface Props {
  children: JSX.Element;
}

export function MobileDetailsTable(props: Props) {
  return (
    <>
      <style jsx>{`
        div.MobileDetailsTable {
          position: relative;
          margin-top: 40px;
        }
      `}</style>
      <div className="MobileDetailsTable">{props.children}</div>
    </>
  );
}
