export interface IFilter {
  handleCancel: () => void;
  handleApply: (value: string) => () => void;
  filter?: string;
  id: string;
}
