import React from 'react';

import { INDICATOR_COLOR_LOOKUP } from 'data/data-profile';
import { HI_BLUE } from 'data/data-style';
import { ESyncStatus } from 'models/models-data-general';

interface Props {
  status: ESyncStatus;
}

export function NodeStatusIndicator(props: Props) {
  const { status } = props;

  return (
    <>
      <style jsx>{`
        span.NodeStatusIndicator {
          display: inline-block;
        }
        span.NodeStatusIndicator {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: ${INDICATOR_COLOR_LOOKUP[ESyncStatus[status]] || HI_BLUE};
          margin-left: 2px;
          position: relative;
          bottom: 8px;
          box-shadow: 0 0 0 2px #d6e3d9bc;
        }
      `}</style>
      <span className="NodeStatusIndicator"></span>
    </>
  );
}
