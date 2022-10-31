import { createContext } from 'react';
import axios from 'axios';
import { tables, TIME_IDS, PERCENT_IDS, timeHelper } from './data';
import {
  ISymbol,
  ITableManagerContextData,
  IPossibleTables,
  ITableData,
  ISocketData
} from './interfaces';

export const Context = createContext<ITableManagerContextData>({} as ITableManagerContextData);

export const adjustFunding = (fundingData: any): ISocketData => {
  const newFoundingData: ISocketData = {};
  fundingData
    .filter((item: any) => item.s.includes('USDT'))
    .forEach((item: any) => {
      newFoundingData[item.s.replace('USDT', '').toLowerCase()] = item.r;
    });

  return newFoundingData;
};

export const adjustSymbols = (symbols: ISymbol[]): ISymbol[] => {
  const correctSymbols = symbols
    .filter((item: ISymbol) => item.symbol.includes('USDT'))
    .map((item: ISymbol) => ({ ...item, symbol: item.symbol.replace('USDT', '') }));

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

export const prepareData = async (
  symbols: ISymbol[],
  table: IPossibleTables,
  fundingData: ISocketData
): Promise<ITableData> => {
  const columns = tables[table].filter(
    (item) => item.id.toLowerCase() !== 'symbol' && item.enabled
  );
  const symbolsStr: string[] = symbols.map((item) => item.symbol.toUpperCase());
  const data: ITableData = { symbol: symbolsStr };

  columns.forEach((column) => {
    data[column.id.toLowerCase()] = [];
  });

  const requestResp: any = {};

  if (table === IPossibleTables.FUNDING) {
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
      data[column] = requestResp[column].map((_: any, idx: number) => {
        const item = requestResp[column][idx].at(positionToFind);
        return item ? item[valueToFind] : '';
      });
    }

    const base = column.replace('%', '');
    if (PERCENT_IDS.indexOf(column) !== -1 && Object.keys(requestResp).indexOf(base) !== -1) {
      const { positionToFind, valueToFind } = timeHelper[table][base];
      const baseValues = requestResp[base];
      data[column] = baseValues.map((_: any, idx: number) => {
        const newItem = baseValues[idx].at(positionToFind);
        const oldItem = baseValues[idx].at(positionToFind - 1);
        if (!newItem || !oldItem) return '';

        const newItemAsNumber = Number(newItem[valueToFind]);
        const oldItemAsNumber = Number(oldItem[valueToFind]);

        return `${((newItemAsNumber - oldItemAsNumber) * (100 / oldItemAsNumber)).toFixed(2)}%`;
      });
    }

    if (column === 'lsr') {
      const parcial = await Promise.all(
        symbolsStr.map(async (symbol) => {
          const resp = await axios.get(
            `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${symbol.toUpperCase()}USDT&period=15m`
          );
          return resp.data;
        })
      );

      data[column] = symbolsStr.map((_, idx) => {
        const item: any = parcial[idx][parcial[idx].length - 1];
        return item ? Number(item.longShortRatio).toFixed(2) : '';
      });
    }
  }

  return data;
};
