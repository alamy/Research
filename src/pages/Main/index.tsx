import React from 'react';

import { Header, Table } from 'components';
import { IHeaderItem } from 'components/Header/interfaces';
import * as S from './styles';

const MainPage: React.FC = () => {
  const headerItems: IHeaderItem[] = [
    {
      label: 'Long Short Radio',
      onSelect: () => {}
    },
    {
      label: 'Open Interest',
      onSelect: () => {}
    },
    {
      label: 'Order Book Depth',
      onSelect: () => {}
    },
    {
      label: 'Market Volume',
      onSelect: () => {}
    },
    {
      label: 'Liquidations',
      onSelect: () => {}
    },
    {
      label: 'Funding',
      onSelect: () => {}
    },
    {
      label: 'Radar',
      onSelect: () => {}
    },
    {
      label: 'Exposição',
      onSelect: () => {}
    }
  ];

  return (
    <S.Container>
      <Header items={headerItems} />

      <S.ContentContainer>
        <Table />
      </S.ContentContainer>
    </S.Container>
  );
};

export default MainPage;
