import React, { useCallback } from 'react';
import { useTableManager } from 'hooks';

import * as S from './styles';

const Rows: React.FC = () => {
  const { activeColumns } = useTableManager();
  const list = Array.from(Array(22).keys());

  const renderItems = useCallback(() => {
    const result = list.map((_, idx) => (
      <S.Row key={idx.toString()}>
        {activeColumns.map((_, id) => (
          <S.Cell key={id.toString()} />
        ))}
      </S.Row>
    ));
    return result;
  }, [list, activeColumns]);

  return <S.Container width={activeColumns.length * 120}>{renderItems()}</S.Container>;
};

export default Rows;
