import React, { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';

import { CODE_BG, CODE_EM, CODE_LIGHT } from 'data/data-style';

import { bytesToHex, hexify } from './hex';
import { Opcode } from './opcodes';

function Op({ mnemonic, offset, value }: { mnemonic: string; offset: number; value?: Uint8Array }) {
  return (
    <div className="row">
      <div className="cell offset">{hexify(offset, 8)}</div>
      <div className="cell opcode">{mnemonic}</div>
      <div className="cell value">{value && `0x${bytesToHex(value)}`}</div>
      <style jsx>{`
        .offset {
          color: ${CODE_LIGHT};
          font-weight: bold;
        }
        .row {
          display: flex;
        }
        .cell {
          margin-right: 1rem;
        }
        .value {
          color: ${CODE_EM};
        }
      `}</style>
    </div>
  );
}

function disas(bytes) {
  let offset = 0;
  const opcodes = [];

  while (offset < bytes.length) {
    const byte = bytes[offset];
    const op = Opcode.from(byte);

    if (op === null) {
      opcodes.push(<Op key={offset} mnemonic={`unknown (${hexify(byte, 2)})`} offset={offset} />);
      offset++;
      continue;
    }

    // Returns the number of bytes pushed on the stack
    const bytesToPush = op.isPush();

    if (bytesToPush > 0) {
      // α: Number of items opcode places on stack
      // δ: Number of items opcode removes from stack
      const end = offset + 1 + op.alpha * bytesToPush;
      const value = bytes.slice(offset + 1, end);

      opcodes.push(<Op key={offset} mnemonic={op.mnemonic} offset={offset} value={value} />);
      offset = end;
    } else {
      opcodes.push(<Op key={offset} mnemonic={op.mnemonic} offset={offset} />);
      offset++;
    }
  }

  return opcodes;
}

export function OpcodeView({ bytes }: { bytes: Uint8Array }) {
  const opcodes = useMemo(() => disas(bytes), [bytes]);

  const Row = ({ index, style }) => <div style={style}>{opcodes[index]}</div>;

  return (
    <div>
      <style jsx>{`
        div {
          font-family: monospace;
          white-space: pre-wrap;
          word-wrap: break-word;
          background-color: ${CODE_BG};
          padding: 3px 5px;
        }
      `}</style>
      <List height={300} itemCount={opcodes.length} itemSize={24}>
        {Row}
      </List>
    </div>
  );
}
