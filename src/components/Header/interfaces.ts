export interface IHeader {
  items: IHeaderItem[];
}

export interface IHeaderItem {
  label: string;
  onSelect?: () => void | Promise<void>;
}
