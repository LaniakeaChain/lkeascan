import React, { RefObject, createRef, useEffect, useState } from 'react';

import { TextTruncate } from '../text-truncate';

const unitRef: RefObject<HTMLDivElement> = createRef();

interface IValueUnitFormatterProps {
  value: string;
  unit?: string;
}

export function ValueUnitFormatter(props: IValueUnitFormatterProps) {
  const { unit, value } = props;
  const [unitSize, setUnitSize] = useState(0);

  useEffect(() => setUnitSize(unit ? unitRef.current.clientWidth : 0), [unit]);

  return (
    <>
      <style jsx>{`
        div.value {
          color: inherit;
          max-width: calc(100% - ${unitSize}px);
        }
        div.unit {
          color: inherit;
          display: flex;
          justify-content: flex-end;
          flex-direction: row;
          width: auto;
        }
      `}</style>
      <div className="value">
        <TextTruncate isToolTipDisabled>
          <span>{value}</span>
        </TextTruncate>
      </div>
      {unit ? (
        <>
          <span> </span>
          <div className="unit" ref={unitRef}>
            {unit}
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}
