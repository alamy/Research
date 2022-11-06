import React from 'react';
import { useTableManager } from 'hooks';
import { IPossibleTables } from 'hooks/Table/interfaces';

import * as S from './styles';
import { getValueMask } from 'hooks/Table/utils';

const Extra: React.FC = () => {
  const { table, allTableData } = useTableManager();

  const getRealValue = (value: string): number => {
    if (value.includes('T')) return Number(value.replace(/\D/g, '')) * 1000000000000;
    if (value.includes('B')) return Number(value.replace(/\D/g, '')) * 1000000000;
    if (value.includes('M')) return Number(value.replace(/\D/g, '')) * 1000000;
    if (value.includes('K')) return Number(value.replace(/\D/g, '')) * 1000;
    return Number(value.replace(/\D/g, ''));
  };

  if (table !== IPossibleTables.OPEN_INTEREST) return null;
  const total: number =
    allTableData?.reduce((prev, current) => {
      const value = getRealValue(current.oi);
      return prev + value;
    }, 0) || 0;

  if (!total) return null;

  return <S.Label>OI Global: ${getValueMask(total)}</S.Label>;
};

export default Extra;
