/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import useWebSocket from 'react-use-websocket';

import { useHeaderManager } from 'hooks/Header';
import { tables } from './data';
import * as I from './interfaces';
import * as U from './utils';
import * as C from './consants';

export const TableManagerProvider: React.FC<I.ITableManager> = ({ children }) => {
  const { isTable, selectedHeaderId } = useHeaderManager();
  const [totalPages, setTotalPages] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [columns, setColumns] = useState<I.IColumnModel[]>([]);
  const [symbols, setSymbols] = useState<I.ISymbol[]>([]);
  const [tableData, setTableData] = useState<I.IGeneralTableData>({});
  const [filters, setFilters] = useState<I.IFilters>({});
  const [order, setOrder] = useState<I.IGenericData>({});
  const table = isTable() ? selectedHeaderId : '';

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

  const getSymbols = useCallback(async () => {
    const response = await axios.get('https://fapi.binance.com/fapi/v1/ticker/price');
    const correctSymbols = U.adjustSymbols(response.data);
    setSymbols(correctSymbols);
  }, []);

  const prepareTableData = useCallback(async () => {
    if (!symbols.length) {
      await getSymbols();
    }
    const newTableData = { ...tableData };
    for (let index = 0; index < C.TABLES.length; index++) {
      const tb = C.TABLES[index];
      const fundingTableData = U.adjustFunding(fundingData as any);
      const data = await U.prepareData(symbols, tb, fundingTableData);
      newTableData[tb] = data;
    }
    setTableData(newTableData);
  }, [fundingData, getSymbols, symbols, tableData]);

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

        const value1 = Number(prev[column].replace('%', '').replace('M', '').replace('$', ''));
        const value2 = Number(next[column].replace('%', '').replace('M', '').replace('$', ''));

        if (currOrder.order === 'ASC') return value1 - value2;
        return value2 - value1;
      });

      return filteredData;
    },
    [filters, table, order]
  );

  const assertPages = useCallback(() => {
    const pages = Math.ceil(handleApplyFilters(tableData[table] || []).length / C.PAGE_LIMIT);
    setTotalPages(pages);
    setCurrentPage(1);
  }, [handleApplyFilters, table, tableData]);

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

  const getFilteredTableData = useCallback(() => {
    return handleApplyFilters(tableData[table] || []).slice(
      (currentPage - 1) * C.PAGE_LIMIT,
      currentPage * C.PAGE_LIMIT
    );
  }, [currentPage, handleApplyFilters, table, tableData]);

  const getFilters = useCallback(() => {
    return filters[table] || {};
  }, [filters, table]);

  const getActiveColumns = useCallback(() => {
    return columns.filter(({ enabled }) => enabled);
  }, [columns]);

  useEffect(() => {
    assertPages();
  }, [assertPages]);

  useEffect(() => {
    if (isTable()) {
      setCurrentPage(1);
      setColumns([...tables[table]]);
    }
  }, [selectedHeaderId, isTable, table]);

  return (
    <U.Context.Provider
      value={{
        prepareTableData,
        order: order[table] || {},
        setOrderBy,
        removeFilter: handleRemoveFilter,
        setFilter: handleSetFilter,
        filters: getFilters(),
        tableData: tableData[table],
        filteredTableData: getFilteredTableData(),
        symbols,
        totalPages,
        currentPage,
        columns,
        activeColumns: getActiveColumns(),
        table,
        toggleColumnState,
        setPage
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
