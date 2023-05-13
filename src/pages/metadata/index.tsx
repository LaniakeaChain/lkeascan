import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import AppShell from 'components/app-shell';
import { MetadataTable } from 'components/pages/metadata/metadata-table';

function MetadataRegistryPage() {
  const router = useRouter();

  useEffect(() => {
    if (!(process.env.ENABLE_PAID_FEATURES === 'enabled')) {
      router.push('/not-found');
    }
  }, [router]);

  return (
    <AppShell
      render={() => (
        <MetadataTable
          fetchConfig={{
            apiLink: '/metadata',
            pathname: '/metadata',
            params: {},
          }}
        />
      )}
    />
  );
}

export default MetadataRegistryPage;
