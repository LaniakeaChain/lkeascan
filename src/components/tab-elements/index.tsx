import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { DESKTOP_WIDTH } from 'data/data-style';
import { ITabItem } from 'models/models-table-general';
import { findArrayIndex } from 'utils/array';

import { Tabs } from './tabs';

interface Props {
  tabItems: ITabItem[];
}

export function TabElements({ tabItems }: Props) {
  const router = useRouter();

  const tabNames = useMemo(() => tabItems.map((tabItem: ITabItem) => tabItem.name.toLowerCase()), [
    tabItems,
  ]);

  const tabUrl = router.query.tab;
  const index = findArrayIndex(tabNames, (tabName: string) => tabName === tabUrl);
  const activeIndex = index > -1 ? index : 0;

  const handleSelectTab = (newIndex: number) => {
    if (newIndex === activeIndex) return;

    const { link } = tabItems[newIndex];
    void router.push(link.href, link.as);
  };

  return (
    <>
      <style jsx>{`
        div.TabElements {
          min-height: 100%;
          width: 100%;
        }
        div.element {
          padding: 32px 34px 34px;
        }

        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.TabElements {
            min-height: 50vh;
          }
          div.element {
            padding: 0;
          }
        }
      `}</style>
      <div className="TabElements">
        <Tabs
          activeIndex={activeIndex}
          items={tabItems.map((item: ITabItem) => item.label || item.name)}
          onSelectTab={handleSelectTab}
        />
        <div className="element">{tabItems[activeIndex].element}</div>
      </div>
    </>
  );
}
