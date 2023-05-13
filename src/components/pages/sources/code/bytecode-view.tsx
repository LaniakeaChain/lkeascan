import React, { useMemo } from 'react';

import { ViewGroup } from 'components/widgets/view-group';
import { CODE_BG } from 'data/data-style';

import { hexToBytes } from './hex';
import { HexView } from './hex-view';
import { OpcodeView } from './opcodes-view';

interface Props {
  code: string;
}

function BytesView({ code }: Props) {
  return (
    <>
      <style jsx>{`
        pre.bytes {
          font-family: monospace;
          white-space: pre-wrap;
          word-wrap: break-word;
          max-height: 200px;
          overflow: scroll;
          background-color: ${CODE_BG};
          padding: 3px 5px;
        }
        small {
          color: #aaa;
        }
      `}</style>
      <pre className="bytes">{code}</pre>
      <small>{code.length / 2} bytes</small>
    </>
  );
}

export function BytecodeView({ code }: Props) {
  const views = useMemo(() => {
    const codeNoPrefix = code.length > 2 ? code.substring(2) : code;
    const bytes = hexToBytes(codeNoPrefix);

    return {
      bytes: {
        label: 'Bytes',
        component: <BytesView code={codeNoPrefix} />,
      },
      ops: {
        label: 'Op Codes',
        component: <OpcodeView bytes={bytes} />,
      },
      hex: {
        label: 'Hex',
        component: <HexView bytes={bytes} />,
      },
    };
  }, [code]);

  return (
    <div style={{ marginTop: '50px' }}>
      <ViewGroup views={views} activeView="bytes" />
    </div>
  );
}
