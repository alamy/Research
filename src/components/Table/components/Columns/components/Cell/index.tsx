/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useCallback } from 'react';
import FloatContent from 'components/FloatContent';
import { useTableManager } from 'hooks';

import * as C from './components';
import * as I from './interfaces';
import * as S from './styles';

const Cell: React.FC<I.IColumnCell> = ({ item }) => {
  const [orderDown, setOrderDown] = useState<boolean>(true);
  const [isFilterSelected, setFilterSelected] = useState<boolean>(false);

  const { table, filters, setFilter, removeFilter, setOrderBy, order } = useTableManager();
  const column = item.id.toLowerCase();
  const filter = filters[column];
  const isOrdered = order && order.column === column;

  const toggleOrder = useCallback(() => {
    if (orderDown) setOrderBy(column, 'ASC');
    else setOrderBy(column, 'DESC');
    setOrderDown(!orderDown);
  }, [orderDown, column, setOrderBy]);

  const toggleFilter = useCallback(
    (evt: any) => {
      setFilterSelected(!isFilterSelected);
      evt?.stopPropagation();
    },
    [isFilterSelected]
  );

  const handleApply = useCallback(
    (value: string) => (evt?: any) => {
      setFilterSelected(false);
      if (value) setFilter(column, value);
      evt?.stopPropagation();
    },
    [column, setFilter]
  );

  const handleCancel = useCallback(
    (evt?: any) => {
      setFilterSelected(false);
      if (filter) removeFilter(column);
      evt?.stopPropagation();
    },
    [filter, removeFilter, column]
  );

  const getArrow = useCallback(() => {
    if (!isOrdered || orderDown) {
      return <S.ArrowDown selected={isOrdered} onClick={toggleOrder} />;
    }

    return <S.ArrowUp selected={isOrdered} onClick={toggleOrder} />;
  }, [toggleOrder, isOrdered, orderDown]);

  return (
    <S.Container onClick={toggleOrder}>
      <S.Label>{item.label}</S.Label>
      {getArrow()}
      <S.Filter selected={isFilterSelected || (filter && filter.value)} onClick={toggleFilter} />
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
