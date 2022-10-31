export interface IFilter {
  handleCancel: () => void;
  handleApply: (value: string) => () => void;
  id: string;
}
