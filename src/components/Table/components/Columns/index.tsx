import React, { useCallback } from 'react';
import { useTableManager } from 'hooks';

import * as C from './components';
import * as S from './styles';

const Columns: React.FC = () => {
  const { activeColumns } = useTableManager();

  const renderItems = useCallback((): JSX.Element[] => {
    const result = activeColumns.map((item, idx) => <C.Cell key={idx.toString()} item={item} />);
    return result;
  }, [activeColumns]);

  return <S.Container width={activeColumns.length * 120}>{renderItems()}</S.Container>;
};

export default Columns;
