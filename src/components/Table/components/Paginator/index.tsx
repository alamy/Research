/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback } from 'react';
import DropList from 'components/DropList';

import * as I from './interfaces';
import * as S from './styles';
import { IDropItem } from 'components/DropList/interfaces';

const Paginator: React.FC<I.IPaginator> = ({ onSelect, pages, selectedPage }) => {
  const moreThanTen: boolean = pages > 10;
  const list: number[] = Array.from(Array(pages).keys());
  const dropListSelected: IDropItem | undefined = selectedPage
    ? { id: selectedPage.toString(), label: selectedPage.toString() }
    : undefined;
  const dropList: IDropItem[] = list
    .slice(10)
    .map((page) => ({ id: (page + 1).toString(), label: (page + 1).toString() }));

  const renderPages = useCallback((): JSX.Element[] => {
    const listRow: number[] = list.slice(0, moreThanTen ? 10 : list.length);
    const result: JSX.Element[] = listRow.map((page, idx) => (
      <S.PageContainer selected={page === selectedPage} key={idx.toPrecision()}>
        <S.Page>{page + 1}</S.Page>
      </S.PageContainer>
    ));

    return result;
  }, [selectedPage, list, moreThanTen]);

  return (
    <S.Container>
      {renderPages()}

      {moreThanTen && (
        <DropList
          containerStyle={{ marginLeft: 5 }}
          items={dropList}
          onSelect={() => {}}
          selected={dropListSelected}
          dropProps={{
            right: '35%',
            bottom: '11%'
          }}
        />
      )}
    </S.Container>
  );
};

export default Paginator;
