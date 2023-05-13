import classNames from 'classnames';
import React, { ChangeEvent } from 'react';

import { ICON } from 'components/svg';
import {
  DESKTOP_WIDTH,
  HI_BLUE,
  MOBILE_INPUT_GREY_BOX,
  MOBILE_INPUT_GREY_TEXT,
  WHITE,
} from 'data/data-style';
import { IDictionary } from 'models/models-general';

export enum ECheckboxFilterOptionType {
  Desktop = 'Desktop',
}

interface Props {
  type?: ECheckboxFilterOptionType;
  optionsLabelLookup?: IDictionary<string>;
  isChecked: boolean;
  label: string;
  option: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export function CheckboxFilterOption(props: Props) {
  const { isChecked, label, onChange, option, type } = props;
  const id = `CheckboxFilterOption-${option}`;

  return (
    <>
      <style jsx>{`
        li.CheckboxFilterOption:first-child label {
          padding: 16px 0 8px 16px;
        }
        li.CheckboxFilterOption label {
          padding: 8px 0 8px 16px;
        }
        li.CheckboxFilterOption:last-child label {
          padding: 8px 0 16px 16px;
        }
        li.CheckboxFilterOption.Desktop {
          display: inline-block;
          vertical-align: middle;
          padding: 8px 12px;
        }
        li.CheckboxFilterOption.Desktop {
          padding: 0;
        }
        li.CheckboxFilterOption.Desktop label {
          line-height: 20px;
          padding: 8px 12px;
        }
        li.CheckboxFilterOption.Desktop div.box {
          margin-right: 12px;
          border-radius: 4px;
          border: 1px solid ${isChecked ? HI_BLUE : MOBILE_INPUT_GREY_BOX};
        }
        label {
          position: relative;
          display: block;
          text-align: left;
          width: calc(100% - 16px);
          color: ${isChecked ? HI_BLUE : MOBILE_INPUT_GREY_TEXT};
          font-size: 14px;
          line-height: 18px;
          cursor: pointer;
          white-space: pre-wrap;
        }
        input {
          display: none;
        }
        div.box {
          float: left;
          position: relative;
          display: inline-block;
          vertical-align: top;
          width: 18px;
          height: 18px;
          margin-right: 16px;
          border: 1px solid ${isChecked ? HI_BLUE : MOBILE_INPUT_GREY_BOX};
          background-color: transparent;
          border-radius: 2px;
        }
        div.icon {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          color: ${WHITE};
          opacity: 0;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        li.CheckboxFilterOption input:checked + div.box {
          background-color: ${HI_BLUE};
        }
        li.CheckboxFilterOption input:checked + div.box div.icon {
          opacity: 1;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          li.CheckboxFilterOption:first-child label {
            padding: 16px 0 0 0;
          }
          li.CheckboxFilterOption label {
            padding: 12px 0 0 0;
          }
          li.CheckboxFilterOption:last-child label {
            padding: 12px 0 0 0;
          }
          div.box {
            border: 1px solid ${isChecked ? HI_BLUE : MOBILE_INPUT_GREY_BOX};
            margin-right: 12px;
            border-radius: 4px;
          }
          label {
            line-height: 20px;
            width: 100%;
          }
        }
      `}</style>
      <li className={classNames('CheckboxFilterOption', { [type]: type })}>
        <label htmlFor={id}>
          {label}
          <input id={id} name={option} checked={isChecked} type="checkbox" onChange={onChange} />
          <div className="box">
            <div className="icon">{ICON.CheckCheckbox}</div>
          </div>
        </label>
      </li>
    </>
  );
}
