import { IDropItem } from 'components/DropList/interfaces';

export const parseToDroplist = (pages: number[], isComplete: boolean): IDropItem[] => {
  const dropList: IDropItem[] = pages
    .slice(isComplete ? 0 : 10)
    .map((page) => ({ id: (page + 1).toString(), label: (page + 1).toString() }));

  return dropList;
};

export const getDroplistSelected = (
  selectedPage: number,
  isComplete: boolean
): IDropItem | undefined => {
  const baseValue: number = selectedPage || 0;
  if (isComplete) {
    return { id: baseValue.toString(), label: baseValue.toString() };
  }
  const dropListSelected =
    baseValue > 10 ? { id: baseValue.toString(), label: baseValue.toString() } : undefined;
  return dropListSelected;
};
