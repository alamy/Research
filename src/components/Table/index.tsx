/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import * as C from './components';
import * as S from './styles';

const Table: React.FC = () => {
  return (
    <S.Container>
      <C.Columns />
      <C.Rows />
      <C.Paginator pages={20} onSelect={() => {}} selectedPage={0} />
    </S.Container>
  );
};

export default Table;
