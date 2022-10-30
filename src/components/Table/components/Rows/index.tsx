import React, { useCallback } from 'react';

import * as S from './styles';

const Rows: React.FC = () => {
  const list = Array.from(Array(22).keys());

  const renderItems = useCallback(() => {
    const result = list.map((_, idx) => (
      <S.Row key={idx.toString()}>
        {list.map((_, id) => (
          <S.Cell key={id.toString()} />
        ))}
      </S.Row>
    ));
    return result;
  }, [list]);

  return <S.Container>{renderItems()}</S.Container>;
};

export default Rows;
