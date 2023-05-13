import React, { CSSProperties } from 'react';

import { ICON } from 'components/svg';
import { InteractiveButton } from 'components/widgets/interactive-button';
import { FONT_MOBILE_FAMILY, MOBILE_TEXT } from 'data/data-style';
import { IModalButtonConfig } from 'models/models-buttons';

import { ModalWrapper } from './modal-wrapper';

interface Props {
  title: string;
  buttonsConfig: IModalButtonConfig[];
  onClose?(): void;
  style: CSSProperties;
  children: JSX.Element;
}

export function Modal(props: Props) {
  const { buttonsConfig, children, onClose, style, title } = props;
  return (
    <>
      <style jsx>{`
        div.Modal {
          background-color: #fff;
          color: ${MOBILE_TEXT};
          min-width: 560px;
          text-align: left;
          font-family: ${FONT_MOBILE_FAMILY};
        }
        div.header {
          position: relative;
          padding: 24px;
          font-size: 16px;
          line-height: 20px;
        }
        div.buttons {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          padding: 16px 24px;
        }
        button.button {
          font-size: 14px;
          line-height: 16px;
          padding: 8px 12px;
          margin-right: 16px;
        }
        button.button:last-child {
          margin-right: 0;
        }
      `}</style>
      <ModalWrapper onClose={onClose}>
        <div className="Modal" style={style} onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <h4>{title}</h4>
            <InteractiveButton
              style={{
                position: 'absolute',
                right: 20,
                top: '50%',
                width: 32,
                height: 32,
                transform: 'translateY(-50%)',
              }}
              onClick={onClose}
            >
              {ICON.Cross}
            </InteractiveButton>
          </div>
          {children}
          <div className="buttons">
            {buttonsConfig.map(
              ({ disabled, onClick, style: buttonStyle, text, type }, index: number) => (
                <button
                  key={index}
                  className={`button ${type}`}
                  style={buttonStyle}
                  onClick={onClick}
                  disabled={disabled}
                >
                  <div>{text}</div>
                </button>
              ),
            )}
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
