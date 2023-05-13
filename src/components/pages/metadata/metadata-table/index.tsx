import React, { useEffect } from 'react';

import MetadataUploadButton from 'components/pages/metadata/metadata-table/metadata-upload-button';
import { TableContent } from 'components/table-content';
import { METADATA_HEADER_ITEMS } from 'data/table-lookup/data-metadata';
import { IFetchConfig } from 'models/models-data-general';
import { EPageType } from 'models/models-general';
import { IDropdownOption } from 'models/models-inputs';
import { IMetadataTableFetch } from 'models/models-table-metadata';
import useTableFetch from 'utils/api/use-table-fetch';
import { useIsDesktop } from 'utils/dimensions';
import { defined } from 'utils/variable-evaluation';

import { MENU_CLASSNAME } from './cell-contracts-count/metadata-options-control/metadata-options-menu';

interface Props {
  fetchConfig: IFetchConfig;
}

export function MetadataTable({ fetchConfig }: Props) {
  const isDesktop = useIsDesktop();
  const [state, handleChangeFilterParams] = useTableFetch<IMetadataTableFetch>(fetchConfig);

  useEffect(() => {
    const handleCloseAllDialogue = () => {
      const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(MENU_CLASSNAME);

      if (elements && elements.length > 1) {
        for (let i = 0; i < elements.length; i++) {
          const item = elements.item(i);
          const isOpenAlready = item.classList.contains('isOpen');

          if (isOpenAlready) {
            item.classList.remove('isOpen');
          }
        }
      }
    };

    window.addEventListener('click', handleCloseAllDialogue);
    return () => window.removeEventListener('click', handleCloseAllDialogue);
  }, []); //e slint-disable-line

  const handlePageNumberChange = (page: number) => {
    handleChangeFilterParams({ page });
  };

  const handleRowsDisplayedChange = (selectedOption: IDropdownOption) => {
    const size = parseFloat(selectedOption.value);

    const page = defined(state.filterParams)
      ? Math.floor((state.filterParams.size / size) * state.filterParams.page)
      : 1;

    handleChangeFilterParams({ size, page });
  };

  const { data, error, filterParams, loading } = state;

  return (
    <TableContent
      breadcrumbs={[
        {
          name: 'Metadata',
          value: null,
        },
      ]}
      type={isDesktop ? EPageType.metadata : EPageType.metadataMobile}
      isFilterSet={false}
      noElementsMessage="There are no entries to show."
      headerItems={METADATA_HEADER_ITEMS}
      data={data as any}
      error={error}
      loading={loading}
      tableFetchConfig={{
        pageNumberConfig: {
          page: filterParams.page,
          onPageNumberChange: handlePageNumberChange,
        },
        rowsDisplayedConfig: {
          size: filterParams.size,
          onRowsDisplayedChange: handleRowsDisplayedChange,
        },
      }}
      title="Contract Metadata Registry"
      topRightCornerContent={() => <MetadataUploadButton />}
    />
  );
}
