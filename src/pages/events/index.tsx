import React from 'react';

import AppShell from 'components/app-shell';
import { EventsTable } from 'components/pages/events/events-table';
import { EVENTS_HEADER_ITEMS } from 'data/table-lookup/data-events';
import { EDisplayTitleType } from 'models/models-data-general';
import { EPageType } from 'models/models-general';
import { useIsDesktop } from 'utils/dimensions';

function Transactions() {
  const isDesktop = useIsDesktop();
  return (
    <AppShell
      render={() => (
        <EventsTable
          breadcrumbs={[
            {
              name: 'Events',
              value: null,
            },
          ]}
          tablePageType={isDesktop ? EPageType.events : EPageType.eventsMobile}
          fetchConfig={{
            apiLink: '/events',
            pathname: '/events',
            params: {},
          }}
          headerItems={EVENTS_HEADER_ITEMS}
          noElementsMessage="There are no events to show."
          displayTitleType={EDisplayTitleType.Normal}
        />
      )}
    />
  );
}

export default Transactions;
