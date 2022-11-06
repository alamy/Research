/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback } from 'react';

import { useTableManager } from 'hooks';
import DropList from 'components/DropList';
import { IDropItem } from 'components/DropList/interfaces';
import * as U from './utils';
import * as I from './interfaces';
import * as S from './styles';

const Paginator: React.FC<I.IPaginator> = ({ onSelect, pages, selectedPage }) => {
  const { activeColumns } = useTableManager();
  const lastRowIndex = activeColumns.length > 10 ? 10 : activeColumns.length;
  const list: number[] = Array.from(Array(pages).keys());
  const dropListSelected: IDropItem | undefined = U.getDroplistSelected(selectedPage, lastRowIndex);
  const dropList: IDropItem[] = U.parseToDroplist(
    list,
    activeColumns.length > 10 ? 10 : activeColumns.length
  );

  const handleSelectOnList = useCallback(
    (item: IDropItem) => () => {
      onSelect(Number(item.id))();
    },
    [onSelect]
  );

  const renderPages = useCallback((): JSX.Element[] => {
    const listRow: number[] = list.slice(0, lastRowIndex);
    const result: JSX.Element[] = listRow.map((page, idx) => (
      <S.PageContainer
        onClick={onSelect(page + 1)}
        selected={page === selectedPage - 1}
        key={idx.toPrecision()}>
        <S.Page>{page + 1}</S.Page>
      </S.PageContainer>
    ));

    return result;
  }, [selectedPage, list, onSelect, lastRowIndex]);

  return (
    <S.Container>
      {renderPages()}

      {list.slice(0, lastRowIndex).length < pages && (
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
