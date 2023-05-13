import React, { CSSProperties } from 'react';

import {
  FONT_WEIGHT_TITLE,
  MOBILE_INPUT_GREY_TEXT,
  MOBILE_LIGHT_GREY,
  MOBILE_TEXT,
} from 'data/data-style';
import { IDropdownOption } from 'models/models-inputs';

interface IDropdownSection {
  name: string;
  options: IDropdownOption[];
}

interface Props {
  style?: CSSProperties;
  onClose?(): void;
  children: IDropdownSection[];
}

export function DropdownContentSectioned(props: Props) {
  const { children, onClose, style } = props;

  const handleChange = (option: IDropdownOption) => {
    option.onChange();
    onClose();
  };

  return (
    <>
      <style jsx>{`
        ul.DropdownContentSectioned {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          list-style-type: none;
          background-color: #fff;
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.0494509), 0px 5px 8px rgba(0, 0, 0, 0.1);
          width: 184px;
          color: ${MOBILE_TEXT};
          z-index: 100;
        }
        li.section {
          padding: 8px 0;
          border-top: 1px solid ${MOBILE_LIGHT_GREY};
        }
        li.section:first-child {
          border-top: 1px solid transparent;
        }
        li.item {
          display: flex;
          align-items: center;
          height: 32px;
          padding: 0 16px;
          font-size: 14px;
          color: ${MOBILE_INPUT_GREY_TEXT};
          line-height: 16px;
          cursor: pointer;
        }
        h4 {
          font-size: 14px;
          line-height: 16px;
          font-weight: ${FONT_WEIGHT_TITLE};
          padding: 8px 16px;
        }
      `}</style>
      <ul style={style} className="DropdownContentSectioned" onClick={(e) => e.stopPropagation()}>
        {children.map((section: IDropdownSection) => (
          <li className="section" key={section.name}>
            <h4>{section.name}</h4>
            <ul style={style} className="Dropdown" onClick={(e) => e.stopPropagation()}>
              {section.options.map((option: IDropdownOption, itemIndex) => (
                <li
                  className="item --interactions"
                  key={`${option.label}-${itemIndex}`}
                  onMouseUp={() => handleChange(option)}
                  onTouchEnd={() => handleChange(option)}
                  onTouchCancel={() => handleChange(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
