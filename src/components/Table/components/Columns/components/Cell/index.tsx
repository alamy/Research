/* eslint-disable @typescript-eslint/no-empty-function */
import FloatContent from 'components/FloatContent';
import { useTableManager } from 'hooks';
import React, { useState, useCallback } from 'react';

import * as C from './components';
import * as I from './interfaces';
import * as S from './styles';

const Cell: React.FC<I.IColumnCell> = ({ item }) => {
  const [orderDown, setOrderDown] = useState<boolean>(true);
  const [isFilterSelected, setFilterSelected] = useState<boolean>(false);

  const { table, filters, setFilter } = useTableManager();
  const filter = filters[item.id];

  const toggleOrder = useCallback(() => {
    setOrderDown(!orderDown);
  }, [orderDown]);

  return (
    <S.Container>
      <S.Label>{item.label}</S.Label>
      {orderDown ? <S.ArrowDown onClick={toggleOrder} /> : <S.ArrowUp onClick={toggleOrder} />}
      <S.Filter selected={isFilterSelected} onClick={() => setFilterSelected(!isFilterSelected)} />
      <FloatContent style={{ top: 55, width: 145, borderRadius: 5 }} isVisible={isFilterSelected}>
        <C.Filter
          id={`${table}-${item.id}`}
          handleApply={(value: string) => () => {
            setFilterSelected(false);
            setFilter(item.id, value);
          }}
          filter={filter && filter.value}
          handleCancel={() => setFilterSelected(false)}
        />
      </FloatContent>
    </S.Container>
  );
};

export default Cell;
