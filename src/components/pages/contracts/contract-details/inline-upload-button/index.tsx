import React, { ChangeEvent, useCallback, useState } from 'react';

import { TextLink } from 'components/table-content/desktop/table/table-data-row/text-link';
import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { HOVER_PURPLE_TEXT, LIGHT_PURPLE_TEXT } from 'data/data-style';
import { EFetchState, IFetchDataState } from 'models/models-async';
import { ELinkType } from 'models/models-general';
import { IMetadataData } from 'models/models-table-metadata';
import { uploadMetadataFile } from 'utils/api/metadata';
import { resolveLink } from 'utils/navigation';
import { renderSwitch } from 'utils/react';

const id = 'InlineUploadButton';

interface Props {
  initialFetchDataState: IFetchDataState<IMetadataData>;
}

export function InlineUploadButton(props: Props) {
  const [uploadDataState, setUploadState] = useState(props.initialFetchDataState);

  const renderSuccess = () => {
    if (uploadDataState.data) {
      const { links, name }: IMetadataData = uploadDataState.data;
      const link = resolveLink(links, ELinkType.Metadata);
      const style = { fontSize: 12, width: 'auto' };

      if (link) {
        return (
          <TextLink style={style} href={link.href}>
            {name || 'View'}
          </TextLink>
        );
      } else {
        return <TextOnly style={style}>{name || '-'}</TextOnly>;
      }
    }
  };

  const uploadMetadata = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files.item(0);
    setUploadState({ fetchState: EFetchState.Fetching });

    uploadMetadataFile(file)
      .then((data) => setUploadState({ data, fetchState: EFetchState.Success }))
      .catch((data) => setUploadState({ data, fetchState: EFetchState.Error }));
  }, []);

  return (
    <>
      <style jsx>{`
        label.InlineUploadButton {
          color: ${LIGHT_PURPLE_TEXT};
          cursor: pointer;
        }
        span {
          color: ${LIGHT_PURPLE_TEXT};
          font-size: 12px;
          line-height: 16px;
        }
        span.InlineUploadButton:hover {
          color: ${HOVER_PURPLE_TEXT};
          text-decoration: underline;
        }
        input[name='file'] {
          display: none;
        }
      `}</style>
      {renderSwitch(uploadDataState.fetchState, {
        [EFetchState.None]: () => (
          <label className="InlineUploadButton" htmlFor={id}>
            <span>Upload</span>
          </label>
        ),
        [EFetchState.Fetching]: () => <span>Uploading...</span>,
        [EFetchState.Success]: renderSuccess,
        [EFetchState.Error]: () => (
          <label className="InlineUploadButton" htmlFor={id}>
            <span>Error (Click to try again)</span>
          </label>
        ),
      })}
      <input name="file" type="file" id={id} onChange={uploadMetadata} />
    </>
  );
}
