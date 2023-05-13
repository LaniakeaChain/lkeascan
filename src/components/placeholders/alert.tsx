import React, { CSSProperties } from 'react';

interface Props {
  style?: CSSProperties;
  children: JSX.Element | JSX.Element[] | string;
}

export function Alert(props: Props) {
  const { children, style } = props;
  return (
    <>
      <style jsx>{`
        div.Alert {
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        div.Alert.error {
          color: #721c24;
          padding: 0.5rem 0 0.5rem 0.5rem;
          background-color: #fff9fa;
        }
      `}</style>
      <div style={style} className="Alert error">
        {children}
      </div>
    </>
  );
}
