import { IHeaderItem } from 'components/Header/interfaces';
import { IPossibleTables } from 'hooks/Table/interfaces';

export const headerItems: IHeaderItem[] = [
  {
    id: IPossibleTables.LONG_SHORT_RATIO,
    label: 'Long Short Radio'
  },
  {
    id: IPossibleTables.ORDER_BOOK_DEPTH,
    label: 'Order Book Depth'
  },
  {
    id: IPossibleTables.MARKET_VOLUME,
    label: 'Market Volume'
  },
  {
    id: IPossibleTables.OPEN_INTEREST,
    label: 'Open Interest'
  },
  {
    id: IPossibleTables.LIQUIDATIONS,
    label: 'Liquidations'
  },
  {
    id: IPossibleTables.FUNDING,
    label: 'Funding'
  },
  {
    id: IPossibleTables.RADAR,
    label: 'Radar'
  },
  {
    id: IPossibleTables.EXPOSICAO,
    label: 'Exposição'
  }
];
