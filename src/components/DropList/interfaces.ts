import React from 'react';

export interface IDropList {
  items: IDropItem[];
  selected?: IDropItem;
  onSelect: (item: IDropItem) => void;
  dropProps?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

export interface IDropItem {
  id: string;
  label: string;
}
