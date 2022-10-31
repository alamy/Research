import React, { useCallback } from 'react';
import { useTableManager } from 'hooks';

import { CELL_WIDTH } from 'hooks/Table/consants';
import * as C from './components';
import * as S from './styles';

const Rows: React.FC = () => {
  const { activeColumns, symbols } = useTableManager();
  const list = Array.from(Array(symbols.length).keys());

  const renderItems = useCallback(() => {
    const result = list.map((_, idx) => (
      <S.Row key={idx.toString()}>
        {activeColumns.map((item, id) => (
          <C.Cell key={id.toString()} columnIndex={id} rowIndex={idx} />
        ))}
      </S.Row>
    ));
    return result;
  }, [list, activeColumns]);

  return <S.Container width={activeColumns.length * CELL_WIDTH}>{renderItems()}</S.Container>;
};

export default Rows;
