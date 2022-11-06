import { IHeaderItemModel } from 'hooks/Header/interfaces';
import { IPossibleTables } from 'hooks/Table/interfaces';

export const headerItems: IHeaderItemModel[] = [
  {
    id: IPossibleTables.LONG_SHORT_RATIO,
    label: 'Long Short Ratio',
    isTable: true
  },
  {
    id: IPossibleTables.ORDER_BOOK_DEPTH,
    label: 'Order Book Depth',
    isTable: false
  },
  {
    id: IPossibleTables.MARKET_VOLUME,
    label: 'Market Volume',
    isTable: true
  },
  {
    id: IPossibleTables.OPEN_INTEREST,
    label: 'Open Interest',
    isTable: true
  },
  {
    id: IPossibleTables.LIQUIDATIONS,
    label: 'Liquidations',
    isTable: false
  },
  {
    id: IPossibleTables.FUNDING,
    label: 'Funding',
    isTable: true
  },
  {
    id: 'radar',
    label: 'Radar',
    isTable: false
  },
  {
    id: 'expo',
    label: 'Alert Trading View',
    isTable: false
  }
];
