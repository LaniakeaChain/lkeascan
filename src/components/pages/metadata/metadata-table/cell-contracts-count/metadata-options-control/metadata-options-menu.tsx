import React, { cloneElement } from 'react';

import { IMetadataOption } from 'models/models-table-metadata';

export const MENU_CLASSNAME = 'MetadataOptionsMenu';

interface Props {
  id: string;
  options: IMetadataOption[];
  onClose(): void;
}

export function MetadataOptionsMenu(props: Props) {
  const { id, onClose, options } = props;
  return (
    <>
      <style jsx>{`
        div.MetadataOptionsMenu {
          display: none;
          position: absolute;
          right: 17px;
          top: calc(50% + 15px);
          min-width: 160px;
          background: #fff;
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.0494509), 0px 5px 8px rgba(0, 0, 0, 0.1);
          z-index: 1;
        }
        div.MetadataOptionsMenu.isOpen {
          display: block;
        }
        ul {
          list-style-type: none;
        }
        li {
          padding: 8px 0;
        }
      `}</style>
      <div id={id} className={MENU_CLASSNAME}>
        <ul onClick={(e) => e.stopPropagation()}>
          {options.map((option: IMetadataOption) => (
            <li key={option.name}>{cloneElement(option.component, { onClose })}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
