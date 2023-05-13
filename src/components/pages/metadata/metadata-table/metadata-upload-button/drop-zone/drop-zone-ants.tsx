import classNames from 'classnames';
import React from 'react';

import { MOBILE_GREY_TEXT } from 'data/data-style';

interface Props {
  isAnimating: boolean;
}

export function DropZoneAnts(props: Props) {
  const { isAnimating } = props;
  return (
    <>
      <style jsx>{`
        svg.ants {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
        }
        svg.ants rect {
          fill: none;
          stroke: ${MOBILE_GREY_TEXT};
          stroke-width: 10px;
          vector-effect: non-scaling-stroke;
          stroke-dasharray: 8px 2px;
          stroke-width: 2px;
          stroke-dasharray: 4px;
          stroke-dashoffset: 8px;
        }
        svg.ants.isAnimating rect {
          animation: stroke 0.2s linear infinite;
        }
        @keyframes stroke {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
      <svg
        className={classNames('ants', { isAnimating })}
        viewBox="0 0 40 40"
        preserveAspectRatio="none"
      >
        <path d="M 20,20 L 40,40" />
        <path d="M 20,20 L 00,40 " />
        <path d="M 20,20 L 40,0" />
        <path d="M 20,20 L 0,0" />
        <rect width="40" height="40" />
      </svg>
    </>
  );
}
