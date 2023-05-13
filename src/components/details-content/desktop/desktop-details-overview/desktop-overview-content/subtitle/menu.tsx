import classNames from 'classnames';
import React, { useEffect } from 'react';

import { defined } from 'utils/variable-evaluation';

interface Props {
  isHashShown: boolean;
  onClose(): void;
  onShowHashClick?(): void;
  onRenameClick?(): void;
}

export function DesktopOverviewContentMenu(props: Props) {
  const { isHashShown, onClose, onRenameClick, onShowHashClick } = props;

  const handleRenameClick = () => {
    onRenameClick();
    onClose();
  };

  const handleShowHashClick = () => {
    onShowHashClick();
    onClose();
  };

  useEffect(() => {
    const handleWindowClick = () => {
      onClose();
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [onClose]);

  const isDisabled = !defined(onShowHashClick) || isHashShown;
  return (
    <>
      <style jsx>{`
        ul.DesktopOverviewContentMenu {
          list-style: none;
          background-color: #fff;
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.0494509), 0px 5px 8px rgba(0, 0, 0, 0.1);
          padding: 8px 0;
        }
        button {
          height: 32px;
          padding: 8px 16px;
          font-size: 14px;
          line-height: 16px;
          text-align: left;
          color: #131e41;
          width: 100%;
        }
        button.isDisabled {
          color: #e5e4e9;
          cursor: not-allowed;
        }
      `}</style>
      <ul className="DesktopOverviewContentMenu" onClick={(e) => e.stopPropagation()}>
        <li>
          <button className="--interactions" onClick={handleRenameClick}>
            Tag
          </button>
        </li>
        <li>
          <button
            disabled={isDisabled}
            className={classNames('--interactions', { isDisabled })}
            onClick={handleShowHashClick}
          >
            Show hash
          </button>
        </li>
      </ul>
    </>
  );
}
