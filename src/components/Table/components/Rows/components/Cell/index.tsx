import { useTableManager } from 'hooks';
import React from 'react';

import * as I from './interfaces';
import * as S from './styles';

const Cell: React.FC<I.ICell> = ({ column, rowIndex }) => {
  const { tableData } = useTableManager();
  let data = tableData[rowIndex] ? tableData[rowIndex][column] : '';
  const isNumeric =
    (typeof data === 'string' && !!Number(data.replace('%', ''))) || typeof data === 'number';
  const isPositive = typeof data === 'string' && Number(data.replace('%', '')) > 0;
  const isNegative = typeof data === 'string' && Number(data.replace('%', '')) < 0;
  const notLSR = column !== 'lsr';

  if (column !== 'lsr' && isNumeric && isPositive) data = '+' + data;

  return (
    <S.Container>
      <S.Label
        isNumeric={notLSR && isNumeric}
        isPositive={notLSR && isPositive}
        isNegative={notLSR && isNegative}>
        {data?.toUpperCase() || '-'}
      </S.Label>
    </S.Container>
  );
};

export default Cell;
