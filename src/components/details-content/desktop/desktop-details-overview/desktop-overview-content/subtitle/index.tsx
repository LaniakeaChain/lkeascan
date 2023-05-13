import React, { useState } from 'react';

import { ISubtitleConfig } from 'models/models-details-general';
import { handleAddMapping, handleDeleteMapping } from 'utils/api/mappings';
import { INIT_ASYNC } from 'utils/api/queries';
import { useTimeout } from 'utils/use-timeout';
import { defined } from 'utils/variable-evaluation';

import { MenuControl } from './menu-control';
import { DesktopOverviewContentMenuLabel } from './menu-label';
import { DesktopOverviewContentMenuRename } from './menu-rename';

function resolveCurrentLabel(label, mappingAsyncState) {
  return mappingAsyncState.data || label;
}

interface Props {
  subtitleConfig: ISubtitleConfig;
}

export function DesktopOverviewContentSubtitle(props: Props) {
  const { subtitleConfig } = props;
  // both label and display seem to be doing the same
  const { display, label: configLabel, value } = subtitleConfig;

  const [isRenamingActive, setRenamingToggle] = useState(false);
  const [mappingAsyncState, setMappingAsyncState] = useState(INIT_ASYNC);
  const [label, setLabel] = useState(display || configLabel || value);

  const currentLabel = resolveCurrentLabel(label, mappingAsyncState);
  const isDisplay = defined(currentLabel);
  const isDisplayValid = currentLabel !== value;

  const [isHashShown, onHashShownToggle] = useState(false);

  const [hashToogleTimeout] = useTimeout(2000);

  const handleRenamingToggle = (isRenaming: boolean) => {
    setRenamingToggle(isRenaming);
  };

  const handleHashToggle = () => {
    onHashShownToggle(true);
    hashToogleTimeout(() => onHashShownToggle(false));
  };

  const handleCancel = () => setRenamingToggle(false);

  const handleDone = (labelText: string) => {
    setRenamingToggle(false);
    handleAddMapping(value, labelText, setMappingAsyncState);
  };

  const handleDeleting = () => {
    setRenamingToggle(false);
    setLabel(value);
    handleDeleteMapping(value, setMappingAsyncState);
  };

  return (
    <>
      <style jsx>{`
        div.DesktopOverviewContentSubtitle {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-top: 38px;
          height: 22px;
        }
      `}</style>
      <div className="DesktopOverviewContentSubtitle">
        {isRenamingActive ? (
          <DesktopOverviewContentMenuRename
            fetchState={mappingAsyncState.fetchState}
            onResetClick={handleDeleting}
            onCancelClick={handleCancel}
            onDoneClick={handleDone}
          >
            {currentLabel || value}
          </DesktopOverviewContentMenuRename>
        ) : (
          <DesktopOverviewContentMenuLabel>
            {isHashShown ? value : currentLabel}
          </DesktopOverviewContentMenuLabel>
        )}
        <MenuControl
          isHashShown={isHashShown}
          subtitleConfig={subtitleConfig}
          onRenamingToggle={handleRenamingToggle}
          onHashToggle={isDisplay && isDisplayValid ? handleHashToggle : null}
        />
      </div>
    </>
  );
}
