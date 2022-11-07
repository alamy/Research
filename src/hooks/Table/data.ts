import { ITablesMapper, ITimeHelper } from './interfaces';

export const TIME_IDS = ['15m', '1h', '4h', '1d'];
export const PERCENT_IDS = ['15m%', '1h%', '4h%', '1d%'];

export const timeHelper: ITimeHelper = {
  long_short_ratio: {
    '15m': {
      url: 'https://fapi.binance.com/futures/data/globalLongShortAccountRatio',
      valueToFind: 'longShortRatio',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -1,
      positionTarget: -3
    },
    '1h': {
      url: 'https://fapi.binance.com/futures/data/globalLongShortAccountRatio',
      valueToFind: 'longShortRatio',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -1,
      positionTarget: -13
    },
    '4h': {
      url: 'https://fapi.binance.com/futures/data/globalLongShortAccountRatio',
      valueToFind: 'longShortRatio',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -1,
      positionTarget: -17
    },
    '1d': {
      url: 'https://fapi.binance.com/futures/data/globalLongShortAccountRatio',
      valueToFind: 'longShortRatio',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -1,
      positionTarget: -25
    }
  },
  market_volume: {
    '15m': {
      url: 'https://fapi.binance.com/futures/data/takerlongshortRatio',
      valueToFind: 'buySellRatio',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -2,
      positionTarget: -2
    },
    '1h': {
      url: 'https://fapi.binance.com/futures/data/takerlongshortRatio',
      valueToFind: 'buySellRatio',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -12,
      positionTarget: -12
    },
    '4h': {
      url: 'https://fapi.binance.com/futures/data/takerlongshortRatio',
      valueToFind: 'buySellRatio',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -16,
      positionTarget: -16
    },
    '1d': {
      url: 'https://fapi.binance.com/futures/data/takerlongshortRatio',
      valueToFind: 'buySellRatio',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -24,
      positionTarget: -24
    }
  },
  open_interest: {
    '15m': {
      url: 'https://fapi.binance.com/futures/data/openInterestHist',
      valueToFind: 'sumOpenInterestValue',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -1,
      positionTarget: -3
    },
    '1h': {
      url: 'https://fapi.binance.com/futures/data/openInterestHist',
      valueToFind: 'sumOpenInterestValue',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -1,
      positionTarget: -13
    },
    '4h': {
      url: 'https://fapi.binance.com/futures/data/openInterestHist',
      valueToFind: 'sumOpenInterestValue',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -1,
      positionTarget: -17
    },
    '1d': {
      url: 'https://fapi.binance.com/futures/data/openInterestHist',
      valueToFind: 'sumOpenInterestValue',
      periodOrigin: '5m',
      periodTarget: '5m',
      positionOrigin: -1,
      positionTarget: -25
    }
  }
};

export const tables: ITablesMapper = {
  long_short_ratio: [
    {
      id: 'Symbol',
      label: 'Symbol',
      enabled: true
    },
    {
      id: 'LSR',
      label: 'LSR',
      enabled: true
    },
    {
      id: '15m',
      label: '15m Δ',
      enabled: false
    },
    {
      id: '15m%',
      label: '15m Δ%',
      enabled: true
    },
    {
      id: '1h',
      label: '1h Δ',
      enabled: false
    },
    {
      id: '1h%',
      label: '1h Δ%',
      enabled: true
    },
    {
      id: '4h',
      label: '4h Δ',
      enabled: false
    },
    {
      id: '4h%',
      label: '4h Δ%',
      enabled: true
    },
    {
      id: '1d',
      label: '24h Δ',
      enabled: false
    },
    {
      id: '1d%',
      label: '24h Δ%',
      enabled: true
    }
  ],
  order_book_depth: [
    {
      id: 'Symbol',
      label: 'Symbol',
      enabled: true
    },
    {
      id: 'Bids',
      label: 'Bids',
      enabled: true
    },
    {
      id: 'Pressure',
      label: 'Pressure',
      enabled: true
    },
    {
      id: 'Asks',
      label: 'Asks',
      enabled: true
    }
  ],
  market_volume: [
    {
      id: 'Symbol',
      label: 'Symbol',
      enabled: true
    },
    {
      id: '15m Δ x mean',
      label: '15m Δ x mean',
      enabled: false
    },
    {
      id: '15m buy',
      label: '15m buy',
      enabled: false
    },
    {
      id: '15m sell',
      label: '15m sell',
      enabled: false
    },
    {
      id: '15m',
      label: '15m BSR Δ',
      enabled: false
    },
    {
      id: '15m%',
      label: '15m Δ%',
      enabled: true
    },
    {
      id: '1h buy',
      label: '1h buy',
      enabled: false
    },
    {
      id: '1h sell',
      label: '1h sell',
      enabled: false
    },
    {
      id: '1h',
      label: '1h BSR Δ',
      enabled: false
    },
    {
      id: '1h%',
      label: '1h Δ%',
      enabled: true
    },
    {
      id: '4h buy',
      label: '4h buy',
      enabled: false
    },
    {
      id: '4h sell',
      label: '4h sell',
      enabled: false
    },
    {
      id: '4h',
      label: '4h BSR Δ',
      enabled: false
    },
    {
      id: '4h%',
      label: '4h Δ%',
      enabled: true
    },
    {
      id: '24h buy',
      label: '24h buy',
      enabled: false
    },
    {
      id: '24h sell',
      label: '24h sell',
      enabled: false
    },
    {
      id: '1d',
      label: '24h BSR Δ',
      enabled: false
    },
    {
      id: '1d%',
      label: '24h Δ%',
      enabled: false
    }
  ],
  open_interest: [
    {
      id: 'Symbol',
      label: 'Symbol',
      enabled: true
    },
    {
      id: 'OI',
      label: 'OI %',
      enabled: true
    },
    {
      id: 'Positions',
      label: 'Positions',
      enabled: false
    },
    {
      id: '15m',
      label: '15m Δ',
      enabled: false
    },
    {
      id: '15m%',
      label: '15m Δ%',
      enabled: true
    },
    {
      id: '1h',
      label: '1h Δ',
      enabled: false
    },
    {
      id: '1h%',
      label: '1h Δ%',
      enabled: true
    },
    {
      id: '4h',
      label: '4h Δ',
      enabled: false
    },
    {
      id: '4h%',
      label: '4h Δ%',
      enabled: true
    },
    {
      id: '24h',
      label: '24h Δ',
      enabled: false
    },
    {
      id: '1d%',
      label: '24h Δ%',
      enabled: true
    }
  ],
  liquidations: [
    {
      id: 'Symbol',
      label: 'Symbol',
      enabled: true
    },
    {
      id: 'Longs 15m',
      label: 'Longs 15m',
      enabled: true
    },
    {
      id: 'Longs OI% 15m',
      label: 'Longs OI% 15m',
      enabled: true
    },
    {
      id: 'Shorts 15m',
      label: 'Shorts 15m',
      enabled: true
    },
    {
      id: 'Shorts OI% 15m',
      label: 'Shorts OI% 15m',
      enabled: true
    },

    {
      id: 'Longs 1h',
      label: 'Longs 1h',
      enabled: true
    },
    {
      id: 'Longs OI% 1h',
      label: 'Longs OI% 1h',
      enabled: true
    },
    {
      id: 'Shorts 1h',
      label: 'Shorts 1h',
      enabled: true
    },
    {
      id: 'Shorts OI% 1h',
      label: 'Shorts OI% 1h',
      enabled: true
    },

    {
      id: 'Longs 4h',
      label: 'Longs 4h',
      enabled: true
    },
    {
      id: 'Longs OI% 4h',
      label: 'Longs OI% 4h',
      enabled: true
    },
    {
      id: 'Shorts 4h',
      label: 'Shorts 4h',
      enabled: true
    },
    {
      id: 'Shorts OI% 4h',
      label: 'Shorts OI% 4h',
      enabled: true
    },

    {
      id: 'Longs 24h',
      label: 'Longs 24h',
      enabled: true
    },
    {
      id: 'Longs OI% 24h',
      label: 'Longs OI% 24h',
      enabled: true
    },
    {
      id: 'Shorts 24h',
      label: 'Shorts 24h',
      enabled: true
    },
    {
      id: 'Shorts OI% 24h',
      label: 'Shorts OI% 24h',
      enabled: true
    }
  ],
  funding: [
    {
      id: 'Symbol',
      label: 'Symbol',
      enabled: true
    },
    {
      id: 'Funding Rate',
      label: 'Funding Rate',
      enabled: true
    }
  ],
  radar: [
    {
      id: '-',
      label: '-',
      enabled: true
    },
    {
      id: '-',
      label: '-',
      enabled: true
    },
    {
      id: '-',
      label: '-',
      enabled: true
    },
    {
      id: '-',
      label: '-',
      enabled: true
    },
    {
      id: '-',
      label: '-',
      enabled: true
    }
  ],
  exposicao: [
    {
      id: '-',
      label: '-',
      enabled: true
    },
    {
      id: '-',
      label: '-',
      enabled: true
    },
    {
      id: '-',
      label: '-',
      enabled: true
    },
    {
      id: '-',
      label: '-',
      enabled: true
    },
    {
      id: '-',
      label: '-',
      enabled: true
    }
  ]
};
