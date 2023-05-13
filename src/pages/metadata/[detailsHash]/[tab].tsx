import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import AppShell from 'components/app-shell';
import { MetadataDetails } from 'components/pages/metadata/metadata-details';

function MetadataRegistryPage() {
  const router = useRouter();

  useEffect(() => {
    if (!(process.env.ENABLE_PAID_FEATURES === 'enabled')) {
      router.push('/not-found');
    }
  }, [router]);

  return <AppShell render={() => <MetadataDetails />} />;
}

export default MetadataRegistryPage;
