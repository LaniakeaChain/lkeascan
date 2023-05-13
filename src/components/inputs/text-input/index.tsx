import React, { useCallback } from 'react';

import { DATE_RANGE_INPUT, HI_BLUE, MOBILE_INPUT_GREY_TEXT } from 'data/data-style';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ onChange, value }: Props) {
  const change = useCallback((e) => onChange(e.target.value), [onChange]);
  return (
    <>
      <style jsx>{`
        .input {
          box-sizing: border-box;
          font-size: 14px;
          line-height: 16px;
          height: 32px;
          color: ${MOBILE_INPUT_GREY_TEXT};
          border: 1px solid ${DATE_RANGE_INPUT};
          padding: 7px;
          border-radius: 4px;
        }

        .input:focus {
          border: 1px solid ${HI_BLUE};
          outline: 0;
        }
        .input:disabled {
          background: #f2f2f2;
          font-style: italic;
        }
      `}</style>
      <input className="input" value={value} onChange={change} />
    </>
  );
}
