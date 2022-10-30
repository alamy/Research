import React, { useCallback } from 'react';

import * as C from './components';
import * as I from './interfaces';
import * as S from './styles';

const Columns: React.FC<I.IColumns> = ({ columns }) => {
  const renderItems = useCallback((): JSX.Element[] => {
    const result = columns.map((item, idx) => <C.Cell key={idx.toString()} item={item} />);
    return result;
  }, [columns]);

  return <S.Container width={columns.length * 120}>{renderItems()}</S.Container>;
};

export default Columns;
