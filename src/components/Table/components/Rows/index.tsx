import React, { useCallback } from 'react';
import { Dots } from 'react-activity';
import { useTableManager } from 'hooks';

import { CELL_WIDTH } from 'hooks/Table/consants';
import * as C from './components';
import * as S from './styles';

const Rows: React.FC = () => {
  const { filteredTableData, activeColumns } = useTableManager();

  const renderItems = useCallback(() => {
    const result = filteredTableData.map((item, idx) => (
      <S.Row key={idx.toString()}>
        {Object.keys(item).map((column, id) => (
          <C.Cell key={id.toString()} column={column} rowIndex={idx} />
        ))}
      </S.Row>
    ));
    return result;
  }, [filteredTableData]);

  return (
    <S.Container width={activeColumns.length * CELL_WIDTH}>
      {filteredTableData.length ? (
        renderItems()
      ) : (
        <S.LoadContainer
          style={{
            width: `${(activeColumns.length > 9 ? 9 : activeColumns.length) * CELL_WIDTH}px`
          }}>
          <Dots size={50} color="white" />
        </S.LoadContainer>
      )}
    </S.Container>
  );
};

export default Rows;
