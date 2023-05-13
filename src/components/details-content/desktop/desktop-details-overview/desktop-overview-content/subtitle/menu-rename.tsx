import React, { ChangeEvent, RefObject, createRef, useCallback, useEffect, useState } from 'react';

import { ACTIVE_PURPLE_TEXT_MOBILE } from 'data/data-style';
import { EFetchState } from 'models/models-async';

const inputRef: RefObject<HTMLInputElement> = createRef();

interface Props {
  fetchState: EFetchState;
  onDoneClick(labelText?: string): void;
  onResetClick(): void;
  onCancelClick(): void;
  children?: string;
}

export function DesktopOverviewContentMenuRename(props: Props) {
  const { children, onCancelClick, onDoneClick, onResetClick } = props;
  const [labelText, setLabelText] = useState(children || '');

  useEffect(() => {
    inputRef.current.focus();
  }, [children]);

  const handleLabel = (e: ChangeEvent<HTMLInputElement>) => setLabelText(e.currentTarget.value);

  const submitSearchText = useCallback(() => {
    if (labelText && labelText !== children) {
      onDoneClick(labelText.trim());
    } else {
      onCancelClick();
    }
  }, [children, labelText, onCancelClick, onDoneClick]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitSearchText();
    }
  };

  useEffect(() => {
    const handleWindowClick = () => {
      submitSearchText();
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [submitSearchText]);

  return (
    <>
      <style jsx>{`
        div.DesktopOverviewContentMenuRename {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: flex-end;
          color: #49525c;
          padding: 7px 11px 7px 7px;
          border: 1px solid #1203ce;
          box-sizing: border-box;
          border-radius: 4px;
          width: 513px;
        }
        input {
          height: 22px;
          font-size: 18px;
          line-height: 22px;
          margin-left: 8px;
          margin-right: 16px;
          width: calc(100% - 26px - 34px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #49525c;
        }
        input:focus + button.add {
          color: ${ACTIVE_PURPLE_TEXT_MOBILE};
        }
        button.reset {
          font-size: 10px;
          line-height: 12px;
        }
      `}</style>
      <div className="DesktopOverviewContentMenuRename" onClick={(e) => e.stopPropagation()}>
        <button className="reset --text-link" onClick={onResetClick}>
          Reset
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder="Label"
          value={labelText}
          onChange={handleLabel}
          onKeyDown={handleKeyDown}
          name="label-editing"
        />
        {/*<button className="add --text-link" onClick={submitSearchText}>*/}
        {/*{renderSwitch(fetchState, {*/}
        {/*[EFetchState.None]: () => ICON.Plus,*/}
        {/*[EFetchState.Fetching]: () => <LoadingSpinner style={{ width: 18, height: 18 }} />,*/}
        {/*[EFetchState.Success]: () => ICON.Tick,*/}
        {/*[EFetchState.Error]: () => ICON.ErrorCross,*/}
        {/*})}*/}
        {/*</button>*/}
      </div>
    </>
  );
}
