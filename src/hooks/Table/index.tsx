/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
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
  const [order, setOrder] = useState<I.IGenericData>({});
  const [timer, setTimer] = useState<number>(0);
  const [PAGE_LIMIT] = useState<number>(20);

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
      setTimer(60);
    }
  };

  const handleApplyFilters = useCallback(
    (data: I.IRowData[]): I.IRowData[] => {
      const currFilters = filters[table];
      let filteredData = data;
      if (currFilters && Object.keys(currFilters).length) {
        filteredData = data.filter((item) => {
          const isValid = Object.keys(currFilters).every((column) =>
            item[column].toLowerCase().includes(currFilters[column].value.toLowerCase())
          );
          return isValid;
        });
      }

      const currOrder = order[table];
      if (!currOrder) return filteredData;

      const { column } = currOrder;

      filteredData.sort((prev, next) => {
        if (column === 'symbol') {
          if (currOrder.order === 'ASC') {
            return prev.symbol.localeCompare(next.symbol);
          } else {
            return next.symbol.localeCompare(prev.symbol);
          }
        }

        const value1 = Number(prev[column].replace(/\D/g, ''));
        const value2 = Number(next[column].replace(/\D/g, ''));

        if (currOrder.order === 'ASC') return value1 - value2;
        return value2 - value1;
      });

      return filteredData;
    },
    [filters, table, order]
  );

  const assertPages = useCallback(() => {
    const pages = Math.ceil(handleApplyFilters(tableData[table] || []).length / PAGE_LIMIT);
    setTotalPages(pages);
    setCurrentPage(1);
  }, [PAGE_LIMIT, handleApplyFilters, table, tableData]);

  const handleSetFilter = useCallback(
    (column: string, value: string) => {
      const newFilters = { ...filters };
      if (!newFilters[table]) {
        newFilters[table] = {};
      }

      newFilters[table][column] = { value, order: '' };
      setFilters(newFilters);
      assertPages();
    },
    [filters, table, assertPages]
  );

  const handleRemoveFilter = useCallback(
    (column: string) => {
      const newFilters = { ...filters };
      if (!newFilters[table]) return;
      delete newFilters[table][column];
      setFilters(newFilters);
      assertPages();
    },
    [filters, table, assertPages]
  );

  const setOrderBy = useCallback(
    (column: string, od: 'ASC' | 'DESC') => {
      const newOrder: I.IGenericData = { ...order };
      newOrder[table] = { column, order: od };
      setOrder(newOrder);
    },
    [table, order]
  );

  useEffect(() => {
    prepareTableData();
  }, [prepareTableData]);

  useEffect(() => {
    getSymbols();
  }, [getSymbols]);

  useEffect(() => {
    formatFoundingData();
  }, [fundingData]);

  useEffect(() => {
    assertPages();
  }, [assertPages]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <U.Context.Provider
      value={{
        order: order[table] || {},
        setOrderBy,
        removeFilter: handleRemoveFilter,
        setFilter: handleSetFilter,
        filters: filters[table] || {},
        timeToUpdate: timer,
        tableData: handleApplyFilters(tableData[table] || []).slice(
          (currentPage - 1) * PAGE_LIMIT,
          currentPage * PAGE_LIMIT
        ),
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
