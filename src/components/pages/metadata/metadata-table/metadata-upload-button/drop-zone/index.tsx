import React, { RefObject, createRef, useState } from 'react';

import { MOBILE_TEXT } from 'data/data-style';
import { EFetchState } from 'models/models-async';

import { DropZoneAnts } from './drop-zone-ants';
import { DropZoneFileList } from './drop-zone-file-list';

const id = 'DropZone';
const dropZoneRef: RefObject<HTMLLabelElement> = createRef();

interface Props {
  files: File[];
  children: JSX.Element;
  fetchState: EFetchState;
  onChange(files: FileList): void;
  onDeleteFile(index: number): void;
}

export function DropZone(props: Props) {
  const { children, fetchState, files, onChange, onDeleteFile } = props;
  const [isDragging, setDragging] = useState(false);
  const isDisabled = fetchState === EFetchState.Fetching;

  const handleDragReset = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragStart = (e) => {
    setDragging(true);
    handleDragReset(e);
  };

  const handleChange = (e) => {
    onChange(e.target.files);
  };

  const handleLogDroppedFiles = (e) => {
    onChange(e.dataTransfer.files);
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    handleDragReset(e);
  };

  const handleDrop = (e) => {
    handleDragEnd(e);
    handleLogDroppedFiles(e);
  };

  return (
    <>
      <style jsx>{`
        label.drop-zone {
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 32px 0;
          margin-top: 40px;
          color: ${MOBILE_TEXT};
          cursor: pointer;
        }
        label + input[name='file'] {
          position: absolute;
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          z-index: -1;
        }
        ul.file-list {
          margin-top: 24px;
          list-file-type: none;
        }
        li {
          color: #131e41;
          margin-top: 4px;
        }
        li:first-child {
          margin-top: 0;
        }
      `}</style>
      <label
        ref={dropZoneRef}
        className="drop-zone"
        htmlFor={id}
        onDrag={handleDragReset}
        onDragStart={handleDragReset}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragStart}
        onDragEnter={handleDragStart}
        onDragLeave={handleDragEnd}
        onDrop={handleDrop}
      >
        <DropZoneAnts isAnimating={isDragging} />
        {children}
      </label>
      <input
        name="file"
        type="file"
        disabled={isDisabled}
        id={id}
        multiple
        onChange={handleChange}
      />
      {files && files.length > 0 && <DropZoneFileList list={files} onDeleteClick={onDeleteFile} />}
    </>
  );
}
