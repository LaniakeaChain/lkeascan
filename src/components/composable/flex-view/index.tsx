import { FlexDirectionProperty } from 'csstype';
import React, { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  flexDirection: FlexDirectionProperty;
  style?: CSSProperties;
}

export function FlexView(props: Props) {
  const { children, flexDirection, style } = props;

  return <div style={{ ...style, display: 'flex', flexDirection: flexDirection }}>{children}</div>;
}
