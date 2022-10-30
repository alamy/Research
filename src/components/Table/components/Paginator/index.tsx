/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback } from 'react';
import DropList from 'components/DropList';

import { IDropItem } from 'components/DropList/interfaces';
import * as U from './utils';
import * as I from './interfaces';
import * as S from './styles';
import { useTableManager } from 'hooks';

const Paginator: React.FC<I.IPaginator> = ({ onSelect, pages, selectedPage }) => {
  const { activeColumns } = useTableManager();
  const hideRowList: boolean = activeColumns.length < 4;
  const showDropList: boolean = pages > 10;
  const list: number[] = Array.from(Array(pages).keys());
  const dropListSelected: IDropItem | undefined = U.getDroplistSelected(selectedPage, hideRowList);
  const dropList: IDropItem[] = U.parseToDroplist(list, hideRowList);

  const handleSelectOnList = useCallback(
    (item: IDropItem) => () => {
      onSelect(Number(item.id))();
    },
    [onSelect]
  );

  const renderPages = useCallback((): JSX.Element[] => {
    const listRow: number[] = list.slice(0, showDropList ? 10 : list.length);
    const result: JSX.Element[] = listRow.map((page, idx) => (
      <S.PageContainer
        onClick={onSelect(page + 1)}
        selected={page === selectedPage - 1}
        key={idx.toPrecision()}>
        <S.Page>{page + 1}</S.Page>
      </S.PageContainer>
    ));

    return result;
  }, [selectedPage, list, showDropList, onSelect]);

  return (
    <S.Container>
      {!hideRowList && renderPages()}

      {showDropList && (
        <DropList
          containerStyle={{ marginLeft: 5 }}
          items={dropList}
          onSelect={handleSelectOnList}
          selected={dropListSelected}
          dropProps={{
            bottom: 20
          }}
        />
      )}
    </S.Container>
  );
};

export default Paginator;
