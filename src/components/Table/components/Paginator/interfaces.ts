export interface IPaginator {
  pages: number;
  selectedPage: number;
  onSelect: (page: number) => void;
}
