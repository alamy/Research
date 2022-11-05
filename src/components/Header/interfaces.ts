export interface IHeader {
  items: IHeaderItem[];
  selectedId?: string;
  onSelect?: (item: IHeaderItem) => () => void | Promise<void>;
}

export interface IHeaderItem {
  id: string;
  label: string;
}
