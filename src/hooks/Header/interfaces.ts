/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface IHeaderManager {
  children: React.ReactNode;
}

export interface IHeaderManagerContextData {
  headerItems: IHeaderItemModel[];
  selectedHeaderId: string;
  selectedItem: IHeaderItemModel;
  setHeaderItems: (items: IHeaderItemModel[]) => void;
  selectHeaderItem: (id: string) => void;
  isTable: () => boolean;
}

export interface IHeaderItemModel {
  id: string;
  label: string;
  isTable: boolean;
}
