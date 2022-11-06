/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { createContext } from 'react';
import axios from 'axios';
import { tables, TIME_IDS, PERCENT_IDS, timeHelper } from './data';
import * as I from './interfaces';
import { S_PLACEHOLDER, UNAVAILABLE_SYMBOLS } from './consants';

export const Context = createContext<I.ITableManagerContextData>({} as I.ITableManagerContextData);

export const adjustFunding = (fundingData: I.IFundingData[]): I.ISocketData => {
  const newFoundingData: I.ISocketData = {};
  fundingData
    .filter((item: I.IFundingData) => item.s.includes('USDT'))
    .forEach((item: I.IFundingData) => {
      newFoundingData[item.s.replace('USDT', '').toLowerCase()] = item.r;
    });

  return newFoundingData;
};

export const adjustSymbols = (symbols: I.ISymbol[]): I.ISymbol[] => {
  const correctSymbols = symbols
    .filter((item: I.ISymbol) => item.symbol.includes('USDT'))
    .map((item: I.ISymbol) => ({ ...item, symbol: item.symbol.replace('USDT', '') }))
    .filter(
      (item: I.ISymbol) => UNAVAILABLE_SYMBOLS.indexOf(item.symbol.toLocaleLowerCase()) === -1
    );

  return correctSymbols;
};

const loadTimeData = async (
  table: string,
  column: string,
  period: string,
  symbolsStr: string[]
) => {
  const { url } = timeHelper[table][column];
  const response = await Promise.all(
    symbolsStr.map(async (symbol) => {
      const response = await axios.get(
        `${url}?symbol=${symbol.toUpperCase()}USDT&period=${period}`
      );
      return response.data;
    })
  );

  return response;
};

const getBaseData = (symbols: I.ISymbol[], table: string) => {
  const columns = tables[table].filter(
    (item) => item.id.toLowerCase() !== 'symbol' && item.enabled
  );
  const symbolsStr: string[] = symbols.map((item) => item.symbol.toUpperCase());

  const data: I.IRowData[] = [];

  symbols.forEach((item) => {
    const current: I.IGenericData = { symbol: item.symbol.toLowerCase() };
    columns.forEach((column) => {
      current[column.id.toLowerCase()] = '';
    });

    data.push(current);
  });

  const requestResp: I.IGenericData = {};

  return { columns, symbolsStr, data, requestResp };
};

const getParcial = async (symbolsStr: string[], url: string): Promise<any[]> => {
  const parcial = await Promise.all(
    symbolsStr.map(async (symbol) => {
      try {
        const resp = await axios.get(url.replace(S_PLACEHOLDER, `${symbol.toUpperCase()}USDT`));
        return resp.data;
      } catch (err) {
        return {};
      }
    })
  );

  return parcial;
};

export const getValueMask = (value: string | number): string => {
  const valueAsNumber = Number(value);
  if (!valueAsNumber) return `${value}`;

  const thousands = Math.floor(valueAsNumber / 1000);
  const milions = Math.floor(valueAsNumber / 1000000);
  const bilions = Math.floor(valueAsNumber / 1000000000);
  const trillions = Math.floor(valueAsNumber / 1000000000000);

  if (trillions) return `${trillions}T`;
  if (bilions) return `${bilions}B`;
  if (milions) return `${milions}M`;
  if (thousands) return `${thousands}K`;
  return `${valueAsNumber}`;
};

const getFundingData = (data: I.IRowData[], fundingData: I.ISocketData): I.IRowData[] => {
  const newData = [...data];
  newData.forEach((item) => {
    item['funding rate'] = `${(Number(fundingData[item.symbol]) * 100).toFixed(4)}%`;
  });

  return newData;
};

const getLSRData = async (
  table: I.IPossibleTables,
  data: I.IRowData[],
  symbolsStr: string[],
  columns: I.IColumnModel[],
  requestResp: I.IGenericData
) => {
  for (let index = 0; index < columns.length; index++) {
    const column = columns[index].id.toLowerCase();

    if (TIME_IDS.indexOf(column) !== -1) {
      const { positionOrigin, periodTarget, periodOrigin, valueToFind } = timeHelper[table][column];
      requestResp[column] = await loadTimeData(table, column, column, symbolsStr);
      if (!requestResp[periodOrigin])
        requestResp[periodOrigin] = await loadTimeData(table, column, periodOrigin, symbolsStr);
      if (periodTarget !== periodOrigin) {
        requestResp[periodTarget] = await loadTimeData(table, column, periodTarget, symbolsStr);
      }
      data.forEach((row, index) => {
        const item = requestResp[column][index].at(positionOrigin);
        row[column] = item[valueToFind] || '';
      });
    }

    const base = column.replace('%', '');
    if (PERCENT_IDS.indexOf(column) !== -1) {
      const { positionOrigin, positionTarget, valueToFind, periodOrigin, periodTarget } =
        timeHelper[table][base];
      if (!requestResp[periodOrigin])
        requestResp[periodOrigin] = await loadTimeData(table, base, periodOrigin, symbolsStr);
      if (periodTarget !== periodOrigin && !requestResp[periodTarget]) {
        requestResp[periodTarget] = await loadTimeData(table, base, periodTarget, symbolsStr);
      }
      const originValues = requestResp[periodOrigin];
      const targetValues = requestResp[periodTarget];
      data.forEach((row, index) => {
        const newItem = originValues[index].at(positionOrigin);
        const oldItem = targetValues[index].at(positionTarget);
        if (!newItem || !oldItem) return '';

        const newItemAsNumber = Number(newItem[valueToFind]);
        const oldItemAsNumber = Number(oldItem[valueToFind]);

        row[column] = `${((newItemAsNumber / oldItemAsNumber - 1) * 100).toFixed(2)}%`;
      });
    }

    if (column === 'lsr') {
      const url = `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${S_PLACEHOLDER}&period=15m`;
      const parcial = requestResp['15m'] || (await getParcial(symbolsStr, url));

      data.forEach((row, index) => {
        const item: any = parcial[index][parcial[index].length - 1];
        row[column] = item ? Number(item.longShortRatio).toFixed(1) : '';
      });
    }
  }

  return data;
};

const getMVData = async (
  table: I.IPossibleTables,
  data: I.IRowData[],
  symbolsStr: string[],
  columns: I.IColumnModel[],
  requestResp: I.IGenericData
) => {
  for (let index = 0; index < columns.length; index++) {
    const column = columns[index].id.toLowerCase();

    if (TIME_IDS.indexOf(column) !== -1) {
      const { positionOrigin, periodTarget, periodOrigin, valueToFind } = timeHelper[table][column];
      requestResp[column] = await loadTimeData(table, column, column, symbolsStr);
      if (!requestResp[periodOrigin])
        requestResp[periodOrigin] = await loadTimeData(table, column, periodOrigin, symbolsStr);
      if (periodTarget !== periodOrigin) {
        requestResp[periodTarget] = await loadTimeData(table, column, periodTarget, symbolsStr);
      }
      data.forEach((row, index) => {
        const item = requestResp[column][index].at(positionOrigin);
        row[column] = item[valueToFind] || '';
      });
    }

    const base = column.replace('%', '');
    if (PERCENT_IDS.indexOf(column) !== -1) {
      const { positionOrigin, valueToFind, periodOrigin } = timeHelper[table][base];
      if (!requestResp[periodOrigin])
        requestResp[periodOrigin] = await loadTimeData(table, base, periodOrigin, symbolsStr);
      const originValues = requestResp[periodOrigin];
      data.forEach((row, index) => {
        const newItem = originValues[index].at(positionOrigin);
        if (!newItem) return '';

        const newItemAsNumber = Number(newItem[valueToFind]);

        row[column] = `${((newItemAsNumber - 1) * 100).toFixed(2)}%`;
      });
    }
  }

  return data;
};

const getOIData = async (
  symbols: I.ISymbol[],
  columns: I.IColumnModel[],
  symbolsStr: string[],
  requestResp: I.IGenericData,
  data: I.IRowData[]
) => {
  for (let index = 0; index < columns.length; index++) {
    const column = columns[index].id.toLowerCase();
    if (column === 'oi') {
      const url = `https://fapi.binance.com/fapi/v1/openInterest?symbol=${S_PLACEHOLDER}`;
      const parcial = await getParcial(symbolsStr, url);
      requestResp[column] = parcial;
      const symbolValues: I.IGenericData = {};
      symbols.forEach((symbol) => {
        symbolValues[symbol.symbol.toUpperCase()] = symbol.price;
      });

      data.forEach((row, index) => {
        row[column] = `$${getValueMask(
          Number(requestResp.oi[index].openInterest) *
            Number(symbolValues[row.symbol.toUpperCase()])
        )}`;
      });
    }
  }

  return data;
};

export const prepareData = async (
  symbols: I.ISymbol[],
  table: I.IPossibleTables,
  fundingData: I.ISocketData
): Promise<I.IRowData[]> => {
  const { columns, data, requestResp, symbolsStr } = getBaseData(symbols, table);

  if (table === I.IPossibleTables.FUNDING) {
    return getFundingData(data, fundingData);
  }

  if (table === I.IPossibleTables.LONG_SHORT_RATIO) {
    return await getLSRData(table, data, symbolsStr, columns, requestResp);
  }

  if (table === I.IPossibleTables.MARKET_VOLUME) {
    return await getMVData(table, data, symbolsStr, columns, requestResp);
  }

  if (table === I.IPossibleTables.OPEN_INTEREST) {
    return await getOIData(symbols, columns, symbolsStr, requestResp, data);
  }

  return data;
};
