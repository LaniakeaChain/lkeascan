import React, { ChangeEvent } from 'react';

import { HI_BLUE, MOBILE_INPUT_GREY_BOX, MOBILE_INPUT_GREY_TEXT } from 'data/data-style';
import { IRadioSortItem } from 'models/models-inputs';

interface Props {
  item: IRadioSortItem;
  isChecked: boolean;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export function MobileRadioFilterOption(props: Props) {
  const { isChecked, item, onChange } = props;
  const id = `RadioFilterOption-${item.value}`;

  return (
    <>
      <style jsx>{`
        li.option {
          padding-top: 16px;
        }
        label {
          position: relative;
          display: block;
          text-align: left;
          width: 100%;
          color: ${isChecked ? HI_BLUE : MOBILE_INPUT_GREY_TEXT};
          font-size: 14px;
          line-height: 20px;
          cursor: pointer;
        }
        input {
          display: none;
        }
        div.circle-outline {
          float: left;
          position: relative;
          display: inline-flex;
          vertical-align: top;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid ${isChecked ? HI_BLUE : MOBILE_INPUT_GREY_BOX};
          margin-right: 12px;
        }
        div.circle-inner {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          opacity: 0;
          background-color: ${HI_BLUE};
        }
        li.option input:checked + div.circle-outline div.circle-inner {
          opacity: 1;
        }
      `}</style>
      <li className="option">
        <label htmlFor={id}>
          <input
            id={id}
            name="sort"
            value={item.value}
            checked={isChecked}
            type="checkbox"
            onChange={onChange}
          />
          <div className="circle-outline">
            <div className="circle-inner" />
          </div>
          {item.value}
        </label>
      </li>
    </>
  );
}
