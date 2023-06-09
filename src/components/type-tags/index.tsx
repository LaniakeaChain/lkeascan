import React, { CSSProperties } from 'react';

import { DESKTOP_WIDTH, LIGHT_PURPLE_TAG, PURPLE_TAG_TEXT } from 'data/data-style';
import { ETagType } from 'models/models-tags';

const TAG_STYLE_LOOKUP = {
  Private: {
    color: '#657786',
    backgroundColor: '#E6ECF0',
  },
  Self: {
    color: '#657786',
    backgroundColor: '#E6ECF0',
  },
  In: {
    color: '#22570A',
    backgroundColor: '#E1FECB',
  },
  Out: {
    color: '#773703',
    backgroundColor: '#FEEECB',
  },
  Block: {
    color: PURPLE_TAG_TEXT,
    backgroundColor: LIGHT_PURPLE_TAG,
  },
  ['Contract Call']: {
    color: '#026937',
    backgroundColor: '#D5F6E7',
  },
  ['Contract Creation']: {
    color: '#7D0251',
    backgroundColor: '#FECBCB',
  },
  Transfer: {
    color: '#030377',
    backgroundColor: '#CBDBFE',
  },
  Custom: {
    color: '#032A74',
    backgroundColor: '#D5EFF6',
  },
  ERC20: {
    color: '#026069',
    backgroundColor: '#D5F6EF',
  },
  Fungible: {
    color: '#026069',
    backgroundColor: '#D5F6EF',
  },
  ['Fungible (ERC20)']: {
    color: '#026069',
    backgroundColor: '#D5F6EF',
  },
  ERC223: {
    color: '#026069',
    backgroundColor: '#C7C8F2',
  },
  'Fungible (ERC223)': {
    color: '#026069',
    backgroundColor: '#C7C8F2',
  },
  ERC777: {
    color: '#026069',
    backgroundColor: '#C7C8F2',
  },
  ['Fungible (ERC777)']: {
    color: '#026069',
    backgroundColor: '#C7C8F2',
  },
  ERC721: {
    color: '#794E02',
    backgroundColor: '#F6F3D5',
  },
  ['Non-Fungible']: {
    color: '#794E02',
    backgroundColor: '#F6F3D5',
  },
  ['Non-Fungible (ERC721)']: {
    color: '#794E02',
    backgroundColor: '#F6F3D5',
  },
  ERC1155: {
    color: '#740303',
    backgroundColor: '#F6E9D5',
  },
  Hybrid: {
    color: '#740303',
    backgroundColor: '#F6E9D5',
  },
  ['Hybrid (ERC1155)']: {
    color: '#740303',
    backgroundColor: '#F6E9D5',
  },
};

interface Props {
  privateTypeTagStyle?: CSSProperties;
  isPrivate?: boolean;
  tagType: string;
}

export function TypeTag(props: Props) {
  const { privateTypeTagStyle, tagType } = props;
  return (
    <>
      <style jsx>{`
        div.privateTypeTag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
        }
        div.TypeTag {
          display: inline-flex;
          padding: 3px 6px;
          border-radius: 4px;
        }
        div.TypeTag:first-child {
          margin-right: ${props.isPrivate ? 4 : 0}px;
        }
        div.text {
          font-size: 12px;
          line-height: 14px;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.TypeTag:first-child {
            margin-right: 0px;
            margin-bottom: ${props.isPrivate ? 4 : 0}px;
          }
          div.TypeTag {
            padding: 4px;
            margin-right: 0px;
          }
          div.privateTypeTag {
            flex-direction: column;
            align-items: flex-end;
          }
        }
      `}</style>
      <>
        {props.isPrivate ? (
          <div style={privateTypeTagStyle} className="privateTypeTag">
            <div style={TAG_STYLE_LOOKUP[tagType]} className="TypeTag">
              <div className="text">{tagType}</div>
            </div>
            <div style={TAG_STYLE_LOOKUP[ETagType.Private]} className="TypeTag">
              <div className="text">{ETagType.Private}</div>
            </div>
          </div>
        ) : (
          <div style={TAG_STYLE_LOOKUP[tagType]} className="TypeTag">
            <div className="text">{tagType}</div>
          </div>
        )}
      </>
    </>
  );
}
