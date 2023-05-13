import { ESyncStatus } from 'models/models-data-general';

export const INDICATOR_COLOR_LOOKUP = {
  [ESyncStatus.DOWN]: '#F95E45',
  [ESyncStatus.SYNCING]: '#F8D755',
  [ESyncStatus.UP]: '#04D238',
};
