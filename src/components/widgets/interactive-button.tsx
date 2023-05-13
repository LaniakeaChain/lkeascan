import classNames from 'classnames';
import { MotionProps, motion } from 'framer-motion';
import React, { CSSProperties, useState } from 'react';

import {
  ACTIVE_BUTTON_GREY,
  ARROW_GREY_DISABLED,
  DESKTOP_WIDTH,
  MOBILE_TEXT,
} from 'data/data-style';
import { useTimeout } from 'utils/use-timeout';
import { defined } from 'utils/variable-evaluation';

interface Props {
  style?: CSSProperties;
  isDisabled?: boolean;
  animationConfig?: MotionProps;
  onClick?(): void;
  children: JSX.Element;
}

export function InteractiveButton(props: Props) {
  const { animationConfig, children, isDisabled, onClick, style } = props;
  const [isTapActive, setTapActive] = useState(false);
  const [tapActiveTimeout] = useTimeout(200);

  return (
    <>
      <style jsx>{`
        div.InteractiveButton,
        :global(.InteractiveButton--animated) {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
        }
        div.children,
        :global(.children--animated) {
          position: relative;
          z-index: 1;
        }
        div.tap-active-background,
        :global(.tap-active-background--animated) {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: ${ACTIVE_BUTTON_GREY};
          z-index: 0;
        }
        div.InteractiveButton.isDisabled,
        div.InteractiveButton.isDisabled:hover {
          color: ${ARROW_GREY_DISABLED};
          background-color: transparent;
          cursor: not-allowed;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.InteractiveButton {
            color: ${MOBILE_TEXT};
          }
          div.InteractiveButton.isDisabled:hover,
          div.InteractiveButton.isDisabled {
            opacity: 1;
          }
        }
      `}</style>
      <>
        {defined(animationConfig) ? (
          <motion.div
            style={style}
            className={classNames('InteractiveButton--animated', { isDisabled })}
            whileHover="interact"
            whileTap="interact"
            onClick={() => !isDisabled && defined(onClick) && onClick()}
          >
            <motion.div className="children--animated">{children}</motion.div>
            <motion.div className="tap-active-background--animated" {...animationConfig} />
          </motion.div>
        ) : (
          <div
            style={style}
            className={classNames('InteractiveButton --interactions', { isDisabled })}
            onTouchStart={() => setTapActive(true)}
            onTouchEnd={() => {
              tapActiveTimeout(() => setTapActive(false));
            }}
            onTouchCancel={() => {
              tapActiveTimeout(() => setTapActive(false));
            }}
            onClick={() => !isDisabled && defined(onClick) && onClick()}
          >
            <div className="children">{children}</div>
            {isTapActive ? <div className="tap-active-background" /> : null}
          </div>
        )}
      </>
    </>
  );
}
