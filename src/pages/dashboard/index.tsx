import React from 'react';

import AppShell from 'components/app-shell';
import { DashboardDesktop } from 'components/pages/dashboard/desktop';
import { DashboardMobile } from 'components/pages/dashboard/mobile';
import { useIsTablerOrGreater } from 'utils/dimensions';

export default function DashboardPage() {
  const isTabletOrGreater = useIsTablerOrGreater();

  return (
    <AppShell render={() => (isTabletOrGreater ? <DashboardDesktop /> : <DashboardMobile />)} />
  );
}
