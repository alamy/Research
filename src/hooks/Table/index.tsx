/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import useWebSocket from 'react-use-websocket';

import { tables } from './data';
import * as I from './interfaces';
import * as U from './utils';

export const TableManagerProvider: React.FC<I.ITableManager> = ({ children }) => {
  const [totalPages, setTotalPages] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [table, setTable] = useState<I.IPossibleTables>(I.IPossibleTables.LONG_SHORT_RATIO);
  const [columns, setColumns] = useState<I.IColumnModel[]>([]);
  const [symbols, setSymbols] = useState<I.ISymbol[]>([]);
  const [tableData, setTableData] = useState<I.IGeneralTableData>({});
  const [fundingTableData, setFoundingTableData] = useState<I.ISocketData>({});
  const [filters, setFilters] = useState<I.IFilters>({});
  const [timer, setTimer] = useState<number>(0);

  const { lastJsonMessage: fundingData } = useWebSocket(
    'wss://fstream.binance.com/ws/!markPrice@arr'
  );

  const toggleColumnState = useCallback(
    (index: number, state: boolean) => {
      const newColumnState = [...columns];
      newColumnState[index].enabled = state;
      setColumns(newColumnState);
    },
    [columns]
  );

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSetTable = useCallback((currentTable: I.IPossibleTables) => {
    setCurrentPage(1);
    setTable(currentTable);
  }, []);

  const getSymbols = useCallback(async () => {
    const response = await axios.get('https://fapi.binance.com/fapi/v1/ticker/price');
    const correctSymbols = U.adjustSymbols(response.data);
    setSymbols(correctSymbols);
  }, []);

  const prepareTableData = useCallback(async () => {
    setColumns([...tables[table]]);
    const data = await U.prepareData(symbols, table, fundingTableData);
    const newTableData = { ...tableData };
    newTableData[table] = data;
    setTableData(newTableData);
  }, [fundingTableData, symbols, table]);

  const formatFoundingData = () => {
    if (!fundingData) return;
    if (timer <= 0) {
      const newFoundingData: I.ISocketData = U.adjustFunding(fundingData as any);
      setFoundingTableData(newFoundingData);
      setTimer(180);
    }
  };

  useEffect(() => {
    prepareTableData();
  }, [prepareTableData]);

  useEffect(() => {
    getSymbols();
  }, [getSymbols]);

  useEffect(() => {
    formatFoundingData();
  }, [fundingData]);

  const handleSetFilter = useCallback(
    (column: string, value: string) => {
      const newFilters = { ...filters };
      if (!newFilters[table]) {
        newFilters[table] = {};
      }

      newFilters[table][column] = { value, order: '' };
      setFilters(newFilters);
    },
    [filters, table]
  );

  const handleRemoveFilter = useCallback(
    (column: string) => {
      const newFilters = { ...filters };
      if (!newFilters[table]) return;
      delete newFilters[table][column];
      setFilters(newFilters);
    },
    [filters]
  );

  const handleApplyFilters = useCallback(
    (data: I.IGenericData) => {
      /*
      const validIndex: I.IGenericData = {};
      const currFilters = filters[table];
      const td = tableData[table];
      let resultIndex: number[] = [];
      const resultMap: I.IGenericData = {};
      const resultMapFilter: any[] = [];
      const finalResult: I.IGenericData = {};

      if (!currFilters || !Object.keys(currFilters).length) return data;

      Object.keys(currFilters).forEach((filter) => {
        const column = td[filter.toLowerCase()];
        column.forEach((value, idx) => {
          if (`${value}`.toLowerCase().includes(`${currFilters[filter].value.toLowerCase()}`)) {
            if (!validIndex[filter.toLowerCase()]) {
              validIndex[filter.toLowerCase()] = [idx];
            } else {
              validIndex[filter.toLowerCase()].push(idx);
            }
          }
        });
      });

      if (!Object.keys(validIndex).length) return {};

      Object.keys(validIndex).forEach((filter) => {
        resultIndex = [...resultIndex, ...validIndex[filter]];
      });

      resultIndex.forEach((value) => {
        resultMap[value] = !resultMap[value] ? 1 : resultMap[value] + 1;
      });

      Object.keys(resultMap).forEach((idx) => {
        if (resultMap[idx] === Object.keys(validIndex).length) {
          resultMapFilter.push(idx);
        }
      });

      Object.keys(td).forEach((column) => {
        finalResult[column] = resultMapFilter.map((idx) => td[column][idx]);
      });

      // console.log(resultMapFilter);

      return finalResult;
      */
    },
    [tableData, filters]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <U.Context.Provider
      value={{
        removeFilter: handleRemoveFilter,
        setFilter: handleSetFilter,
        filters: filters[table] || {},
        timeToUpdate: timer,
        tableData: tableData[table] || [],
        symbols,
        totalPages,
        currentPage,
        columns,
        activeColumns: columns.filter(({ enabled }) => enabled),
        table,
        toggleColumnState,
        setPage,
        setTable: handleSetTable
      }}>
      {children}
    </U.Context.Provider>
  );
};

export const useTableManager = (): I.ITableManagerContextData => {
  const context = useContext<I.ITableManagerContextData>(U.Context);

  if (!context) {
    throw new Error('useTableManager must be used whithin a TableManagerProvider');
  }

  return context;
};
