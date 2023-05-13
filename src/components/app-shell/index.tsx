import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Wallet } from 'components/wallet';
import {
  DESKTOP_WIDTH,
  HEADER_HEIGHT,
  MENU_SIDE_DESKTOP_WIDTH,
  MIN_CONTENT_WIDTH,
  MOBILE_SMALL_WIDTH,
} from 'data/data-style';
import { IUser, IUserProfile } from 'models/models-auth';
import { Authentication } from 'utils/api/auth';
import { useIsDesktop, useWindowSize } from 'utils/dimensions';
import { pathToName } from 'utils/format';
// import { initializeHotjar } from 'utils/hotjar';
import { useIsFirstAppRender } from 'utils/is-first-render';
import { useTimeout } from 'utils/use-timeout';
import { defined } from 'utils/variable-evaluation';

import { CustomHead } from './custom-head';
import { HeaderDesktop } from './header-desktop';
import { HeaderMobile } from './header-mobile';
import { MenuBottomMobile } from './menu-bottom-mobile';
import { MenuSideDesktop } from './menu-side-desktop';
import { NoScript } from './no-script';
import { GLOBAL_STYLES } from './styles';

interface IAppShellRenderedProps {
  userProfile: IUserProfile;
  searchText: string;
}

interface AppShellProps {
  render(props: IAppShellRenderedProps): JSX.Element;
}

export default function AppShell({ render }: AppShellProps) {
  const isFirstAppRender = useIsFirstAppRender();
  const windowSize = useWindowSize();
  const isDesktop = useIsDesktop();
  const router = useRouter();

  const [user, setUser] = useState<IUser>(null);
  const [isSearch, setIsSearch] = useState(false);

  const [searchText, setSearchText] = useState(
    // TODO doesn't work!
    Array.isArray(router.query.query) ? router.query.query.join('') : router.query.query || '',
  );

  /*
  useEffect(() => {
    initializeHotjar();
  }, []);
  */

  const [searchTimeout] = useTimeout(0);

  useEffect(() => {
    const auth = new Authentication();

    auth.getUser().then((fetchedUser: IUser) => {
      if (fetchedUser) {
        setUser(fetchedUser);
      }
    });
  }, []);

  const handleSearchChange = (text: string) => {
    // TODO this is only done to make typing faster since the whole app rerenders
    // There are better ways of doing this
    searchTimeout(() => {
      setSearchText(text);
    });
  };

  const handleSearchFocus = (isSearchFocused: boolean) => {
    if (isSearchFocused) {
      setIsSearch(true);
    }
  };

  const handleCancelSearch = () => {
    setIsSearch(false);
    setSearchText('');
  };

  return (
    <>
      {GLOBAL_STYLES}
      <CustomHead />
      <NoScript />
      <style jsx>{`
        div.AppShell {
          position: relative;
          display: flex;
          flex-direction: row;
          width: 100%;
          height: calc(100% - ${HEADER_HEIGHT}px);
          margin-right: auto;
          margin-left: auto;
        }
        div.main-content-desktop {
          position: relative;
          left: ${MENU_SIDE_DESKTOP_WIDTH}px;
          width: calc(100% - 300px);
          min-height: ${windowSize.height ? `${windowSize.height - HEADER_HEIGHT}px` : 'auto'};
          margin: 0 30px 45px;
        }
        div.mainContentMobile {
          width: calc(100% - 48px);
          min-height: 100%;
          margin: 0 24px 54px;
        }
        @media (min-width: ${MIN_CONTENT_WIDTH}px) {
          div.AppShell {
            width: ${MIN_CONTENT_WIDTH}px;
            height: auto;
          }
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.AppShell {
            height: auto;
          }
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          div.mainContentMobile {
            width: calc(100% - 40px);
            margin: 0 20px 54px;
          }
        }
      `}</style>
      {!isFirstAppRender && (
        <Wallet>
          {isDesktop ? (
            <>
              <HeaderDesktop
                searchText={searchText}
                isSearch={isSearch}
                onSearchChange={handleSearchChange}
                onSearchFocus={handleSearchFocus}
                onSearchExit={handleCancelSearch}
                userProfile={defined(user) ? user.profile : null}
              />
              <div className="AppShell">
                <MenuSideDesktop currentName={pathToName(router.pathname)} />
                <div className="main-content-desktop">
                  {render({
                    searchText,
                    userProfile: defined(user) ? user.profile : null,
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <HeaderMobile
                searchText={searchText}
                isSearch={isSearch}
                onSearchChange={handleSearchChange}
                onSearchFocus={handleSearchFocus}
                onSearchExit={handleCancelSearch}
                isDetails={defined(router.query['detailsHash'])}
                pageName={pathToName(router.pathname)}
              />
              <AnimatePresence>
                {isSearch ? null : (
                  <motion.div
                    key="AppshellAnimated"
                    initial="enter"
                    animate="enter"
                    exit="exit"
                    variants={{
                      exit: {
                        transition: { duration: 0 },
                        opacity: 0,
                      },
                      enter: {
                        opacity: 1,
                      },
                    }}
                    className="AppShell"
                    onTouchStart={() => false}
                  >
                    <MenuBottomMobile currentName={pathToName(router.pathname)} />
                    <div className="mainContentMobile">
                      {render({
                        searchText,
                        userProfile: defined(user) ? user.profile : null,
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </Wallet>
      )}
    </>
  );
}
