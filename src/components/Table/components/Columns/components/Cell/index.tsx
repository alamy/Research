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

  const { table, filters, setFilter, removeFilter } = useTableManager();
  const filter = filters[item.id.toLowerCase()];

  const toggleOrder = useCallback(() => {
    setOrderDown(!orderDown);
  }, [orderDown]);

  const toggleFilter = useCallback(() => {
    setFilterSelected(!isFilterSelected);
  }, [isFilterSelected]);

  const handleApply = useCallback(
    (value: string) => () => {
      setFilterSelected(false);
      if (value) setFilter(item.id.toLowerCase(), value);
    },
    [item.id, setFilter]
  );

  const handleCancel = useCallback(() => {
    setFilterSelected(false);
    if (filter) removeFilter(item.id.toLowerCase());
  }, [filter, item.id, removeFilter]);

  return (
    <S.Container>
      <S.Label>{item.label}</S.Label>
      {orderDown ? <S.ArrowDown onClick={toggleOrder} /> : <S.ArrowUp onClick={toggleOrder} />}
      <S.Filter selected={isFilterSelected || filter} onClick={toggleFilter} />
      <FloatContent style={{ top: 50, width: 150 }} isVisible={isFilterSelected}>
        <C.Filter
          id={`${table}-${item.id}`}
          handleApply={handleApply}
          filter={filter && filter.value}
          handleCancel={handleCancel}
        />
      </FloatContent>
    </S.Container>
  );
};

export default Cell;
