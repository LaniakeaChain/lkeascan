import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import AppShell from 'components/app-shell';
import { Loading } from 'components/placeholders/loading';

const initPath = '/dashboard';

function Index() {
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    router.replace(initPath);
  }, [asPath, router]);

  return <AppShell render={() => <Loading />} />;
}

export default Index;
