import React, { CSSProperties } from 'react';

import { HI_BLUE, LO_PURPLE, MAIN_TABLE_PADDING, PURPLE_WHITE, WHITE } from 'data/data-style';

interface ILoadingSpinnerColor {
  circle: string;
  path: string;
}

export enum ELoadingSpinnerType {
  White = 'White',
}

function colorLookUp(type?: ELoadingSpinnerType): ILoadingSpinnerColor {
  switch (type) {
    default:
      return {
        circle: LO_PURPLE,
        path: HI_BLUE,
      };
    case ELoadingSpinnerType.White:
      return {
        circle: WHITE,
        path: PURPLE_WHITE,
      };
  }
}

interface Props {
  type?: ELoadingSpinnerType;
  style?: CSSProperties;
}

export function LoadingSpinner(props: Props) {
  const { style, type } = props;

  return (
    <svg
      width={MAIN_TABLE_PADDING}
      height={MAIN_TABLE_PADDING}
      style={style}
      viewBox="-1 -1 22 22"
      fill="none"
    >
      <circle
        cx="10"
        cy="10"
        r="10"
        stroke={colorLookUp(type).circle}
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0"
        stroke={colorLookUp(type).path}
        strokeWidth="2"
        strokeMiterlimit="5.75877"
      >
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 10 10"
          to="360 10 10"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

export function LoadingSpinnerCentered() {
  return (
    <LoadingSpinner
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    />
  );
}
