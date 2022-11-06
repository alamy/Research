/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';

import * as S from './styles';
import * as C from './components';
import { Header, Table } from 'components';
import { headerItems } from './data';
import { useHeaderManager } from 'hooks/Header';

const MainPage: React.FC = () => {
  const { setHeaderItems, selectHeaderItem } = useHeaderManager();

  useEffect(() => {
    setHeaderItems(headerItems);
    selectHeaderItem(headerItems[0].id);
  }, []);

  return (
    <S.Container>
      <Header />

      <S.ContentContainer>
        <C.TopContent />
        <Table />
      </S.ContentContainer>
    </S.Container>
  );
};

export default MainPage;
