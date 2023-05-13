import { decode } from 'cbor';
import React, { useMemo } from 'react';

import { CODE_BG, CODE_EM } from 'data/data-style';

import { bytesToHex, hexToBytes } from './hex';

function Metadata({ obj }) {
  function toStr(v) {
    if (Buffer.isBuffer(v)) {
      return bytesToHex(v);
    } else {
      return JSON.stringify(v);
    }
  }

  return (
    <div className="md-obj">
      {Object.entries(obj).map(([k, v]) => (
        <div key={k} className="pair">
          <span className="key">{k}</span>
          <span className="value">{toStr(v)}</span>
        </div>
      ))}
      <style jsx>{`
        .md-obj {
          background-color: ${CODE_BG};
          padding: 5px;
          font-size: 12px;
          margin: 12px 0;
        }
        .pair {
          margin-bottom: 5px;
        }
        .pair:last-child {
          margin-bottom: 0;
        }
        .key {
          margin-right: 0.85rem;
        }
        .value {
          font-family: monospace;
          white-space: pre-wrap;
          color: ${CODE_EM};
        }
      `}</style>
    </div>
  );
}

/**
 * Solc metadata encoded variants:
 * ```
 * 0xa2
 * 0x64 'i' 'p' 'f' 's' 0x58 0x22 <34 bytes IPFS hash>
 * 0x64 's' 'o' 'l' 'c' 0x43 <3 byte version encoding>
 * 0x00 0x33
 * ---
 * 0xa2
 * 0x65 'b' 'z' 'z' 'r' '0' 0x58 0x20 <32 bytes swarm hash>
 * 0x64 's' 'o' 'l' 'c' 0x43 <3 byte version encoding>
 * 0x00 0x32
 * ---
 * 0xa2
 * 0x64 'i' 'p' 'f' 's' 0x58 0x22 <34 bytes IPFS hash>
 * 0x64 's' 'o' 'l' 'c' 0x43 <3 byte version encoding>
 * 0x00 0x33
 * ```
 */
export function BytecodeMetaView({ code }: { code: string }) {
  const md = useMemo(() => {
    try {
      // Extract CBOR encoded metadata length in bytes
      const metaLen = parseInt(code.substring(code.length - 4), 16);
      const startMeta = code.length - (metaLen + 2) * 2;
      const metaHex = code.substring(startMeta, code.length - 4);
      return decode(hexToBytes(metaHex).buffer);
    } catch (error) {
      return {
        ipfs: '???',
      };
    }
  }, [code]);

  return <Metadata obj={md} />;
}
