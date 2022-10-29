import React from 'react';

import { Header } from 'components';
import * as S from './styles';
import { IHeaderItem } from 'components/Header/interfaces';

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
    </S.Container>
  );
};

export default MainPage;
