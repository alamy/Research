import { ITablesMapper } from './interfaces';

export const tables: ITablesMapper = {
  long_short_ratio: [
    {
      id: 'symbol',
      label: 'Symbol',
      enabled: true
    },
    {
      id: '10m',
      label: '10m',
      enabled: true
    },
    {
      id: '15m',
      label: '15m',
      enabled: true
    },
    {
      id: '20m',
      label: '20m',
      enabled: true
    },
    {
      id: '30m',
      label: '30m',
      enabled: true
    },
    {
      id: '1h',
      label: '1h',
      enabled: false
    }
  ],
  order_book_depth: [],
  market_volume: [],
  open_interest: [],
  liquidations: [],
  funding: [],
  radar: [],
  exposicao: []
};
