import React from 'react';
import { useTableManager } from 'hooks';
import { IPossibleTables } from 'hooks/Table/interfaces';

import * as S from './styles';
import { unmaskValue } from 'utils/unmaskValue';
import { getMaskedValue } from 'utils/maskValue';

const OIGlobal: React.FC = () => {
  const { table, tableData } = useTableManager();

  if (table !== IPossibleTables.OPEN_INTEREST) return null;
  const total: number =
    tableData?.reduce((prev, current) => {
      const value = unmaskValue(current.oi);
      return prev + value;
    }, 0) || 0;

  if (!total) return null;

  return <S.Label>OI Global: ${getMaskedValue(total)}</S.Label>;
};

export default OIGlobal;
