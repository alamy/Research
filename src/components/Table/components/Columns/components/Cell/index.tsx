import React, { useState, useCallback } from 'react';

import * as I from './interfaces';
import * as S from './styles';

const Cell: React.FC<I.IColumnCell> = ({ item }) => {
  const [orderDown, setOrderDown] = useState<boolean>(true);
  const [isFilterSelected, setFilterSelected] = useState<boolean>(false);

  const toggleOrder = useCallback(() => {
    setOrderDown(!orderDown);
  }, [orderDown]);

  return (
    <S.Container>
      <S.Label>{item.label}</S.Label>
      {orderDown ? <S.ArrowDown onClick={toggleOrder} /> : <S.ArrowUp onClick={toggleOrder} />}
      <S.Filter />
    </S.Container>
  );
};

export default Cell;
