import React from 'react';

import AppShell from 'components/app-shell';
import { ErrorMessage } from 'components/placeholders/error-message';

export default function Search() {
  return (
    <>
      <style jsx>{`
        div.Search {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <AppShell
        render={({ searchText }) => (
          <div className="Search">
            <ErrorMessage>
              {searchText ? 'Searching...' : 'Your search did not match any results.'}
            </ErrorMessage>
          </div>
        )}
      />
    </>
  );
}
