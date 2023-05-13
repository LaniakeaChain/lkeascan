/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    API_AUTHORITY: process.env.API_AUTHORITY,
    SOURCIFY_URL: process.env.SOURCIFY_URL,
    SOURCIFY_FILES_PATH: process.env.SOURCIFY_FILES_PATH,
    CHAIN_ID: process.env.CHAIN_ID,
    ENABLE_PAID_FEATURES: process.env.ENABLE_PAID_FEATURES,
    ENABLE_SOURCE_VERIFICATION: process.env.ENABLE_SOURCE_VERIFICATION,
    ENABLE_INTERNAL_TX: process.env.ENABLE_INTERNAL_TX,
    SLUG: process.env.CI_ENVIRONMENT_SLUG,
    NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,
    NEWRELIC_APP_ID: process.env.NEWRELIC_APP_ID,
    DISPLAY_NETWORK_TAB: process.env.DISPLAY_NETWORK_TAB,
  },
  // EIP-3091 support
  // https://eips.ethereum.org/EIPS/eip-3091
  // NOTE: address endpoint is implemented w/ a server side redirect
  async rewrites() {
    return [
      {
        source: '/block/:path*',
        destination: '/blocks/:path*'
      },
      {
        source: '/tx/:path*',
        destination: '/transactions/:path*'
      },
      {
        source: '/token/:path*',
        destination: '/tokens/:path*'
      },
    ]
  },
};
