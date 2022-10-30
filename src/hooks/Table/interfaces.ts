import React from 'react';

export interface ITableManager {
  children: React.ReactNode;
}

export interface ITableManagerContextData {
  columns: IColumnModel[];
  activeColumns: IColumnModel[];
  table: IPossibleTables;
  currentPage: number;
  totalPages: number;
  toggleColumnState: (index: number, state: boolean) => void;
  setTable: (table: IPossibleTables) => void;
  setPage: (page: number) => void;
}

export interface ITablesMapper {
  [key: string]: IColumnModel[];
}

export interface IColumnModel {
  id: string;
  label: string;
  enabled: boolean;
}

export enum IPossibleTables {
  LONG_SHORT_RATIO = 'long_short_ratio',
  OPEN_INTEREST = 'open_interest',
  ORDER_BOOK_DEPTH = 'order_book_depth',
  MARKET_VOLUME = 'market_volume',
  LIQUIDATIONS = 'liquidations',
  FUNDING = 'funding',
  RADAR = 'radar',
  EXPOSICAO = 'exposicao'
}
