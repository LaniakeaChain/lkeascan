import React, { CSSProperties, useEffect } from 'react';

import { DESKTOP_WIDTH } from 'data/data-style';
import { IDropdownOption } from 'models/models-inputs';

type Option = string | { value: string; label: string };

interface DropdownContentBasicProps {
  style?: CSSProperties;
  onClose?(): void;
  onChange(option: IDropdownOption): void;
  children: Option[];
}

export function DropdownContentBasic(props: DropdownContentBasicProps) {
  const { children, onChange, onClose, style } = props;

  useEffect(() => {
    const handleWindowClick = () => {
      onClose();
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [onClose]);

  const handleChange = (option: Option) => {
    if (typeof option === 'string') {
      onChange({
        label: option,
        value: option,
      });
    } else {
      onChange({
        label: option.label,
        value: option.value,
      });
    }

    onClose();
  };

  return (
    <>
      <style jsx>{`
        ul.Dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          list-style-type: none;
          background-color: #fff;
          box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05), 0 0 8px 0 rgba(0, 0, 0, 0.05);
          padding: 8px 0;
          width: 112px;
        }
        li {
          display: flex;
          align-items: center;
          height: 33px;
          padding: 0 16px;
          cursor: pointer;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          li {
            height: 32px;
          }
        }
      `}</style>
      <ul style={style} className="Dropdown" onClick={(e) => e.stopPropagation()}>
        {children.map((option) => (
          <li
            className="--interactions"
            key={typeof option === 'string' ? option : option.value}
            onMouseUp={() => handleChange(option)}
            onTouchEnd={() => handleChange(option)}
            onTouchCancel={() => handleChange(option)}
          >
            {typeof option === 'string' ? option : option.label}
          </li>
        ))}
      </ul>
    </>
  );
}
