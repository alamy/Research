import React, { useState, useEffect, useCallback, useContext } from 'react';

import { tables } from './data';
import * as I from './interfaces';
import * as U from './utils';

export const TableManagerProvider: React.FC<I.ITableManager> = ({ children }) => {
  const [totalPages, setTotalPages] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [table, setTable] = useState<I.IPossibleTables>(I.IPossibleTables.LONG_SHORT_RATIO);
  const [columns, setColumns] = useState<I.IColumnModel[]>([]);

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

  useEffect(() => {
    setColumns([...tables[table]]);
  }, [table]);

  return (
    <U.Context.Provider
      value={{
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
