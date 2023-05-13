import { UserManager } from 'oidc-client';

import { useAsyncEffect } from 'utils/lifecycles';

export function AuthenticationSilent() {
  useAsyncEffect(async () => {
    try {
      await new UserManager({}).signinSilentCallback();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, []);

  return null;
}
