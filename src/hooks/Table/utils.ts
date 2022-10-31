/* eslint-disable prettier/prettier */
import { createContext } from 'react';
import axios from 'axios';
import { tables, TIME_IDS, PERCENT_IDS, timeHelper } from './data';
import * as I from './interfaces';
import { S_PLACEHOLDER } from './consants';

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
    .map((item: I.ISymbol) => ({ ...item, symbol: item.symbol.replace('USDT', '') }));

  return correctSymbols;
};

const loadTimeData = async (table: string, column: string, symbolsStr: string[]) => {
  const { url } = timeHelper[table][column];
  const response = await Promise.all(
    symbolsStr.map(async (symbol) => {
      const response = await axios.get(
        `${url}?symbol=${symbol.toUpperCase()}USDT&period=${column}`
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

  const data: I.ITableData = { symbol: symbolsStr };
  columns.forEach((column) => {
    data[column.id.toLowerCase()] = [];
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

export const prepareData = async (
  symbols: I.ISymbol[],
  table: I.IPossibleTables,
  fundingData: I.ISocketData
): Promise<I.ITableData> => {
  const { columns, data, requestResp, symbolsStr } = getBaseData(symbols, table);

  if (table === I.IPossibleTables.FUNDING) {
    for (let index = 0; index < columns.length; index++) {
      const column = columns[index].id.toLowerCase();
      data[column] = symbolsStr.map((symbol) => Number(fundingData[symbol.toLowerCase()]) * 100);
    }
    return data;
  }

  for (let index = 0; index < columns.length; index++) {
    const column = columns[index].id.toLowerCase();

    if (TIME_IDS.indexOf(column) !== -1) {
      const { positionToFind, valueToFind } = timeHelper[table][column];
      requestResp[column] = await loadTimeData(table, column, symbolsStr);
      data[column] = requestResp[column].map((_: unknown, idx: number) => {
        const item = requestResp[column][idx].at(positionToFind);
        return item ? item[valueToFind] : '';
      });
    }

    const base = column.replace('%', '');
    if (PERCENT_IDS.indexOf(column) !== -1 && Object.keys(requestResp).indexOf(base) !== -1) {
      const { positionToFind, valueToFind } = timeHelper[table][base];
      const baseValues = requestResp[base];
      data[column] = baseValues.map((_: unknown, idx: number) => {
        const newItem = baseValues[idx].at(positionToFind);
        const oldItem = baseValues[idx].at(positionToFind - 1);
        if (!newItem || !oldItem) return '';

        const newItemAsNumber = Number(newItem[valueToFind]);
        const oldItemAsNumber = Number(oldItem[valueToFind]);

        return `${((newItemAsNumber - oldItemAsNumber) * (100 / oldItemAsNumber)).toFixed(2)}%`;
      });
    }

    if (column === 'lsr') {
      const url = `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${S_PLACEHOLDER}&period=15m`;
      const parcial = await getParcial(symbolsStr, url);

      data[column] = symbolsStr.map((_, idx) => {
        const item: any = parcial[idx][parcial[idx].length - 1];
        return item ? Number(item.longShortRatio).toFixed(2) : '';
      });
    }

    if (column === 'oi') {
      const url = `https://fapi.binance.com/fapi/v1/openInterest?symbol=${S_PLACEHOLDER}`;
      const parcial = await getParcial(symbolsStr, url);
      requestResp[column] = parcial;
      data[column] = symbolsStr.map((_, idx) => {
        return parcial[idx].openInterest;
      });
    }

    if (column === 'positions' && Object.keys(requestResp).indexOf('oi') !== -1) {
      const symbolValues: I.IGenericData = {};
      symbols.forEach((symbol) => {
        symbolValues[symbol.symbol.toUpperCase()] = symbol.price;
      });

      data[column] = symbolsStr.map((symbol, idx) => {
        const item: any = Number(requestResp.oi[idx].openInterest) * Number(symbolValues[symbol]);
        return item;
      });
    }
  }

  return data;
};
