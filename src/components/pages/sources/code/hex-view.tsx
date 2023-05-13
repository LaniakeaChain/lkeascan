import React, { useMemo } from 'react';

import { CODE_BG, CODE_LIGHT } from 'data/data-style';

import { bytestoAscii, hexify } from './hex';

function OffsetHead(width = 16): string {
  return [...Array(width)].map((_, n) => hexify(n, 2)).join(' ');
}

export function HexView({ bytes, width = 16 }: { bytes: Uint8Array; width?: number }) {
  const hexRows = useMemo(() => {
    const rows = [];

    for (let offset = 0; offset < bytes.length; offset += width) {
      const rowBytes = bytes.slice(offset, offset + width);

      rows.push(<HexRow key={offset} offset={offset} bytes={rowBytes} />);
    }

    return rows;
  }, [bytes, width]);

  return (
    <>
      <style jsx>{`
        .scrollable-table {
          max-height: 500px;
          max-width: 100%;
          overflow: auto;
          display: inline-block;
          padding-right: 16px;
          background-color: ${CODE_BG};
        }
        th.offset {
          text-align: left;
          color: ${CODE_LIGHT};
        }
        thead tr th {
          position: sticky;
          background-color: ${CODE_BG};
          top: 0;
          box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
          white-space: pre;
          padding: 7px 5px;
          user-select: none;
        }
        table tr th,
        table tr td {
          font-family: monospace;
        }
      `}</style>
      <div className="scrollable-table">
        <table>
          <thead>
            <tr>
              <th>OFFSET</th>
              <th className="offset">{OffsetHead()}</th>
              <th>ASCII</th>
            </tr>
          </thead>
          <tbody>{hexRows}</tbody>
        </table>
      </div>
    </>
  );
}

function HexRow({ bytes, offset }: { bytes: Uint8Array; offset: number }) {
  const hexBytes = bytes
    .reduce((arr, byte) => {
      arr.push(hexify(byte, 2));
      return arr;
    }, [])
    .join(' ');

  return (
    <tr className="--mono">
      <td className="offset">{hexify(offset, 8)}</td>
      <td className="hex-bytes">{hexBytes}</td>
      <td className="text">{bytestoAscii(bytes)}</td>
      <style jsx>{`
        td {
          padding: 7px 5px;
          white-space: pre;
        }
        td.offset {
          font-weight: bold;
          color: ${CODE_LIGHT};
          border-right: 1px solid #ddd;
          user-select: none;
        }
        td.text {
          border-left: 1px solid #ddd;
        }
      `}</style>
    </tr>
  );
}
