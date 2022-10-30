/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import * as C from './components';
import { IColumnModel } from './components/Columns/interfaces';
import * as S from './styles';

const Table: React.FC = () => {
  const columns: IColumnModel[] = [
    {
      id: 'symbol',
      label: 'Symbol'
    },
    {
      id: '10m',
      label: '10m'
    },
    {
      id: '15m',
      label: '15m'
    },
    {
      id: '20m',
      label: '20m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    },
    {
      id: '25m',
      label: '25m'
    }
  ];

  return (
    <S.Container>
      <S.SupContentContainer>
        <C.Columns columns={columns} />
        <C.Rows />
      </S.SupContentContainer>

      <C.Paginator pages={20} onSelect={() => {}} selectedPage={0} />
    </S.Container>
  );
};

export default Table;
