import classNames from 'classnames';
import React, { useState } from 'react';

import { DARK_PURPLE } from 'data/data-style';
import { ISubtitleConfig } from 'models/models-details-general';

import { DesktopOverviewContentCopyIcon } from './copy-icon';
import { DesktopOverviewContentMenu } from './menu';
import { DesktopOverviewContentMenuIcon } from './menu-icon';

interface Props {
  isHashShown: boolean;
  subtitleConfig: ISubtitleConfig;
  onRenamingToggle(isRenaming: boolean): void;
  onHashToggle?(): void;
}

export function MenuControl(props: Props) {
  const { isHashShown, onHashToggle, onRenamingToggle, subtitleConfig } = props;
  const [isMenuOpen, setMenuToggle] = useState(false);
  const handleMenuToggle = (isOpen: boolean) => setMenuToggle(isOpen);

  return (
    <>
      <style jsx>{`
        div.DesktopOverviewContentMenuControl {
          display: flex;
          flex-direction: row;
          opacity: 0;
          transition: opacity 200ms;
        }
        div.DesktopOverviewContentMenuControl.isOpen {
          opacity: 1;
        }
        :global(.DesktopOverviewContentSubtitle):hover div.DesktopOverviewContentMenuControl {
          opacity: 1;
        }
        div.label {
          color: ${DARK_PURPLE};
          font-size: 18px;
          line-height: 22px;
          margin-right: 16px;
          max-width: 100%;
        }
        div.menu {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          width: 160px;
          z-index: 9999;
        }
      `}</style>
      <>
        <div className={classNames('DesktopOverviewContentMenuControl', { isOpen: isMenuOpen })}>
          {!subtitleConfig.isNoCopyIcon && (
            <DesktopOverviewContentCopyIcon subtitleConfig={subtitleConfig} />
          )}
          {!subtitleConfig.isNoRenameIcon && (
            <DesktopOverviewContentMenuIcon
              subtitleConfig={subtitleConfig}
              onToggle={() => handleMenuToggle(!isMenuOpen)}
            />
          )}
        </div>
        {isMenuOpen && (
          <div className="menu">
            <DesktopOverviewContentMenu
              isHashShown={isHashShown}
              onShowHashClick={onHashToggle}
              onRenameClick={() => onRenamingToggle(true)}
              onClose={() => handleMenuToggle(false)}
            />
          </div>
        )}
      </>
    </>
  );
}
