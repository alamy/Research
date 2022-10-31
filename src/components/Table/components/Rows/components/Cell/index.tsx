import { useTableManager } from 'hooks';
import React from 'react';

import * as I from './interfaces';
import * as S from './styles';

const Cell: React.FC<I.ICell> = ({ columnIndex, rowIndex }) => {
  const { activeColumns, tableData } = useTableManager();
  const column = activeColumns[columnIndex].id.toLowerCase();
  let data = tableData[column] ? tableData[column][rowIndex] : '';
  const isNumeric =
    (typeof data === 'string' && !!Number(data.replace('%', ''))) || typeof data === 'number';
  const isPositive = (typeof data === 'string' && Number(data.replace('%', '')) > 0) || data > 0;
  const isNegative = (typeof data === 'string' && Number(data.replace('%', '')) < 0) || data < 0;

  if (isNumeric && isPositive) data = '+' + data;

  return (
    <S.Container>
      <S.Label isNumeric={isNumeric} isPositive={isPositive} isNegative={isNegative}>
        {data || '-'}
      </S.Label>
    </S.Container>
  );
};

export default Cell;
