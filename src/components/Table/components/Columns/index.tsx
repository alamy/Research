import React, { useCallback } from 'react';
import { useTableManager } from 'hooks';

import { CELL_WIDTH } from 'hooks/Table/consants';
import * as C from './components';
import * as S from './styles';

const Columns: React.FC = () => {
  const { activeColumns } = useTableManager();

  const renderItems = useCallback((): JSX.Element[] => {
    const result = activeColumns.map((item) => (
      <C.Cell key={`${item.id}-${Math.random()}`} item={item} />
    ));
    return result;
  }, [activeColumns]);

  return <S.Container width={activeColumns.length * CELL_WIDTH}>{renderItems()}</S.Container>;
};

export default Columns;
