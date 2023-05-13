import { EDirectionType } from 'models/models-data-general';

enum ESortTypes {
  Value = 'Value',
  Time = 'Time',
}

const DIRECTION_LOOKUP = {
  [ESortTypes.Value]: {
    [EDirectionType.DESC]: 'Highest First',
    [EDirectionType.ASC]: 'Lowest First',
  },
  [ESortTypes.Time]: {
    [EDirectionType.DESC]: 'Newest First',
    [EDirectionType.ASC]: 'Oldest First',
  },
};

export const SORT_DIRECTION_LOOKUP = {
  'Transaction Count': {
    [EDirectionType.DESC]: DIRECTION_LOOKUP[ESortTypes.Value][EDirectionType.DESC],
    [EDirectionType.ASC]: DIRECTION_LOOKUP[ESortTypes.Value][EDirectionType.ASC],
  },
  Value: {
    [EDirectionType.DESC]: DIRECTION_LOOKUP[ESortTypes.Value][EDirectionType.DESC],
    [EDirectionType.ASC]: DIRECTION_LOOKUP[ESortTypes.Value][EDirectionType.ASC],
  },
  'Creation Date': {
    [EDirectionType.DESC]: DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.DESC],
    [EDirectionType.ASC]: DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.ASC],
  },
  'Last Execution': {
    [EDirectionType.DESC]: DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.DESC],
    [EDirectionType.ASC]: DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.ASC],
  },
  'Last Update': {
    [EDirectionType.DESC]: DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.DESC],
    [EDirectionType.ASC]: DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.ASC],
  },
  'Last Transaction Date': {
    [EDirectionType.DESC]: DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.DESC],
    [EDirectionType.ASC]: DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.ASC],
  },
  Time: {
    [EDirectionType.DESC]: DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.DESC],
    [EDirectionType.ASC]: DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.ASC],
  },
};

const VALUE_SORT_NAME_LOOKUP = {
  transactionCount: 'Transaction Count',
  ethValue: 'Value',
};

export const TIME_SORT_NAME_LOOKUP = {
  created: 'Creation Date',
  lastExecuted: 'Last Execution',
  lastUpdated: 'Last Update',
  timestampISO: 'Time',
};

export const DATE_PICKER_TYPES = Object.keys(TIME_SORT_NAME_LOOKUP);

export const SORT_PLACEHOLDER_LOOKUP = {
  transactionCount: {
    [EDirectionType.DESC]: `${VALUE_SORT_NAME_LOOKUP.transactionCount} - ${
      DIRECTION_LOOKUP[ESortTypes.Value][EDirectionType.DESC]
    }`,
    [EDirectionType.ASC]: `${VALUE_SORT_NAME_LOOKUP.transactionCount} - ${
      DIRECTION_LOOKUP[ESortTypes.Value][EDirectionType.ASC]
    }`,
  },
  ethValue: {
    [EDirectionType.DESC]: `${VALUE_SORT_NAME_LOOKUP.ethValue} - ${
      DIRECTION_LOOKUP[ESortTypes.Value][EDirectionType.DESC]
    }`,
    [EDirectionType.ASC]: `${VALUE_SORT_NAME_LOOKUP.ethValue} - ${
      DIRECTION_LOOKUP[ESortTypes.Value][EDirectionType.ASC]
    }`,
  },
  created: {
    [EDirectionType.DESC]: `${TIME_SORT_NAME_LOOKUP.created} - ${
      DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.DESC]
    }`,
    [EDirectionType.ASC]: `${TIME_SORT_NAME_LOOKUP.created} - ${
      DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.ASC]
    }`,
  },
  lastExecuted: {
    [EDirectionType.DESC]: `${TIME_SORT_NAME_LOOKUP.lastExecuted} - ${
      DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.DESC]
    }`,
    [EDirectionType.ASC]: `${TIME_SORT_NAME_LOOKUP.lastExecuted} - ${
      DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.ASC]
    }`,
  },
  lastUpdated: {
    [EDirectionType.DESC]: `${TIME_SORT_NAME_LOOKUP.lastUpdated} - ${
      DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.DESC]
    }`,
    [EDirectionType.ASC]: `${TIME_SORT_NAME_LOOKUP.lastUpdated} - ${
      DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.ASC]
    }`,
  },
  timestampISO: {
    [EDirectionType.DESC]: `${TIME_SORT_NAME_LOOKUP.timestampISO} - ${
      DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.DESC]
    }`,
    [EDirectionType.ASC]: `${TIME_SORT_NAME_LOOKUP.timestampISO} - ${
      DIRECTION_LOOKUP[ESortTypes.Time][EDirectionType.ASC]
    }`,
  },
};

export const SORT_NAME_LOOKUP = {
  ...TIME_SORT_NAME_LOOKUP,
  ...VALUE_SORT_NAME_LOOKUP,
};
