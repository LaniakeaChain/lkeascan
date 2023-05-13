import { ELinkType } from 'models/models-general';

import { getDayLabelArray } from '../utils/charts';

function getRandomValueArray(numItems, min, max, start) {
  // Create random array of objects
  const data = [];

  for (let i = start; i < numItems + start; i++) {
    data.push({
      value: Math.round(min + max * Math.random()),
    });
  }

  return data;
}

const mostActiveContracts = [
  {
    contractType: 'Custom',
    display: '0x4396603BF8CD273a148ff63A0aD308d2F4803CeD',
    address: '0x4396603BF8CD273a148ff63A0aD308d2F4803CeD',
    transactionCount: 336904,
  },
  {
    contractType: 'Custom',
    display: '0x58769647fdfca2ca1483745BF1B3140E897bcF37',
    address: '0x58769647fdfca2ca1483745BF1B3140E897bcF37',
    transactionCount: 175,
    metadataName: 'EventEmitter',
    links: [
      {
        href: '/tokens',
        rel: ELinkType.Metadata,
      },
    ],
  },
  {
    contractType: 'ERC20',
    display: '0xCDc294B99c6439875db639E2db46e34acdA70517',
    address: '0xCDc294B99c6439875db639E2db46e34acdA70517',
    transactionCount: 110278,
    metadataName: 'Token Contributer',
    links: [
      {
        href: '/tokens',
        rel: ELinkType.Metadata,
      },
    ],
  },
  {
    contractType: 'ERC20',
    display: '0x41dcD122f8906a2e8FAFA19AA1434089A5F9cFeC',
    address: '0x41dcD122f8906a2e8FAFA19AA1434089A5F9cFeC',
    transactionCount: 1527,
  },
  {
    contractType: 'ERC20',
    display: '0x4EF80E7edB33bB5B729f0F3A668f68B459790855',
    address: '0x4EF80E7edB33bB5B729f0F3A668f68B459790855',
    transactionCount: 348493,
  },
  {
    contractType: 'ERC20',
    display: '0x58769647fdfca2ca1483745BF1B3140E897bcF37',
    address: '0x58769647fdfca2ca1483745BF1B3140E897bcF37',
    transactionCount: 1110,
    metadataName: 'Alice Token',
    links: [
      {
        href: '/tokens',
        rel: ELinkType.Metadata,
      },
    ],
  },
];

// Last 30 Days
const last30DaysData = {
  labels: getDayLabelArray(31, 1).map((d) => d.label),
  datasets: [
    {
      label: 'Contract Creation',
      data: getRandomValueArray(31, 2, 5, 1).map((d) => d.value),
      backgroundColor: '#FCBABA',
    },
    {
      label: 'Contract Call',
      data: getRandomValueArray(31, 2, 5, 1).map((d) => d.value),
      backgroundColor: '#C4F2DD',
    },
    {
      label: 'Transfer',
      data: getRandomValueArray(31, 2, 4, 1).map((d) => d.value),
      backgroundColor: '#B9CFFE',
    },
  ],
};

export const DASHBOARD_FIXTURES = {
  overview: [
    {
      name: 'Total Contracts Created',
      value: 1430930,
    },
    {
      name: 'Total Transactions Created',
      value: 256291,
    },
    {
      name: 'Total Tokens',
      value: 37485059,
    },
  ],
  transactionCount: {
    total: 64580,
    max: 70000,
    ...last30DaysData,
  },
  mostActiveContracts,
  tokens: {
    labels: ['Fungible (ERC20)', 'Non-Fungible (ERC721)', 'Fungible (ERC777)'],
    datasets: [
      {
        label: 'title',
        data: [174282, 82015],
        backgroundColor: ['#C6F1E7', '#F8F2BF', '#C7C8F2'],
      },
    ],
  },
};
