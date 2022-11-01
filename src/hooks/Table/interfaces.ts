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
  symbols: ISymbol[];
  tableData: ITableData;
  timeToUpdate: number;
  filters: IGenericData;
  removeFilter: (column: string) => void;
  setFilter: (column: string, value: string) => void;
  toggleColumnState: (index: number, state: boolean) => void;
  setTable: (table: IPossibleTables) => void;
  setPage: (page: number) => void;
}

export interface IFundingData {
  E: number;
  T: number;
  P: string;
  e: string;
  i: string;
  p: string;
  r: string;
  s: string;
}

export interface ITimeRequest {
  url: string;
  valueToFind: string;
  positionToFind: number;
}

export interface ITimeHelper {
  [key: string]: { [key: string]: ITimeRequest };
}

export interface IGeneralTableData {
  [key: string]: ITableData;
}

export interface ITableData {
  [key: string]: (string | number)[];
}

export interface ITablesMapper {
  [key: string]: IColumnModel[];
}

export interface ISocketData {
  [key: string]: string;
}

export interface IGenericData {
  [key: string]: any;
}

export interface IFilters {
  [key: string]: IGenericData;
}

export interface ISymbol {
  symbol: string;
  price: number;
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
