/* eslint-disable @typescript-eslint/no-empty-function */
import { useTableManager } from 'hooks';
import React, { useCallback } from 'react';

import * as C from './components';
import * as S from './styles';

const Table: React.FC = () => {
  const { columns, totalPages, currentPage, setPage } = useTableManager();

  const handleSelectPage = useCallback(
    (page: number) => () => {
      setPage(page);
    },
    [setPage]
  );

  return (
    <S.Container>
      <S.SupContentContainer>
        <C.Columns />
        <C.Rows />
      </S.SupContentContainer>

      <C.Paginator pages={totalPages} onSelect={handleSelectPage} selectedPage={currentPage} />
    </S.Container>
  );
};

export default Table;
