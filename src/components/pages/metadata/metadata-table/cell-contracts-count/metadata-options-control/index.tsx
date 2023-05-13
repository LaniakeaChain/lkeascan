import React, { useCallback, useState } from 'react';
import { UIDConsumer } from 'react-uid';

import { ICON } from 'components/svg';
import { ROW_HEIGHT } from 'components/table-content/desktop/table/table-data-row';
import { InteractiveButton } from 'components/widgets/interactive-button';
import { DESKTOP_WIDTH, MOBILE_GREY_TEXT } from 'data/data-style';
import { IMetadataOption } from 'models/models-table-metadata';
import { useTimeout } from 'utils/use-timeout';

import { MENU_CLASSNAME, MetadataOptionsMenu } from './metadata-options-menu';

interface Props {
  options: IMetadataOption[];
}

export function MetadataOptionsButton(props: Props) {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [buttonClickTimeout] = useTimeout(100);

  const handleClose = (id: string) => {
    document.getElementById(id).classList.remove('isOpen');
  };

  const handleOpen = (id: string) => {
    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(MENU_CLASSNAME);

    if (elements && elements.length > 0) {
      for (let i = 0; i < elements.length; i++) {
        const item = elements.item(i);
        const isOpenAlready = item.classList.contains('isOpen');

        if (id === item.id && !isOpenAlready) {
          item.classList.add('isOpen');
        } else if (isOpenAlready) {
          item.classList.remove('isOpen');
        }
      }
    }
  };

  const handleButtonClick = (id: string) => {
    buttonClickTimeout(() => {
      const isOpen = document.getElementById(id).classList.contains('isOpen');

      if (isOpen) {
        handleClose(id);
      } else {
        handleOpen(id);
      }

      forceUpdate();
    });
  };

  return (
    <>
      <style jsx>{`
        div.MetadataOptionsButton {
          position: relative;
          display: block;
        }
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${ROW_HEIGHT}px;
          height: ${ROW_HEIGHT}px;
          color: ${MOBILE_GREY_TEXT};
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.MetadataOptionsButton {
            display: none;
          }
        }
      `}</style>
      <UIDConsumer>
        {(id: string) => (
          <div className="MetadataOptionsButton">
            <InteractiveButton style={{ zIndex: 0 }}>
              <button onClick={() => handleButtonClick(id)}>{ICON.ThreeDots}</button>
            </InteractiveButton>
            <MetadataOptionsMenu id={id} onClose={() => handleClose(id)} options={props.options} />
          </div>
        )}
      </UIDConsumer>
    </>
  );
}
