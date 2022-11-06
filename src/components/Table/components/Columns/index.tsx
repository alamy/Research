import React, { useCallback } from 'react';
import { useTableManager } from 'hooks';

import { CELL_WIDTH } from 'hooks/Table/consants';
import * as C from './components';
import * as S from './styles';

const Columns: React.FC = () => {
  const { activeColumns, table } = useTableManager();

  const renderItems = useCallback((): JSX.Element[] => {
    const result = activeColumns.map((item) => <C.Cell key={`${table}-${item.id}`} item={item} />);
    return result;
  }, [activeColumns, table]);

  return <S.Container width={activeColumns.length * CELL_WIDTH}>{renderItems()}</S.Container>;
};

export default Columns;
