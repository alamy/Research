/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback } from 'react';
import { Dots } from 'react-activity';

import * as S from './styles';
import * as C from './components';
import { Header, Table, Timer } from 'components';
import { headerItems } from './data';
import { IHeaderItem } from 'components/Header/interfaces';
import { useTableManager } from 'hooks';
import { IPossibleTables } from 'hooks/Table/interfaces';

const MainPage: React.FC = () => {
  const { setTable, table } = useTableManager();
  const onSelect = useCallback(
    (item: IHeaderItem) => () => {
      setTable(item.id as IPossibleTables);
    },
    [setTable]
  );

  return (
    <S.Container>
      <Header items={headerItems} onSelect={onSelect} selectedId={table} />

      <S.ContentContainer>
        {false ? (
          <Dots size={50} color="white" />
        ) : (
          <>
            <C.Extra />
            <Timer />
            <Table />
          </>
        )}
      </S.ContentContainer>
    </S.Container>
  );
};

export default MainPage;
