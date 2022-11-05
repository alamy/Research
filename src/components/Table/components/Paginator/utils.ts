import { IDropItem } from 'components/DropList/interfaces';

export const parseToDroplist = (pages: number[], baseValue: number): IDropItem[] => {
  const dropList: IDropItem[] = pages
    .slice(baseValue)
    .map((page) => ({ id: (page + 1).toString(), label: (page + 1).toString() }));

  return dropList;
};

export const getDroplistSelected = (
  selectedPage: number,
  lastRowIndex: number
): IDropItem | undefined => {
  if (selectedPage > lastRowIndex) {
    return { id: selectedPage.toString(), label: selectedPage.toString() };
  }
};
