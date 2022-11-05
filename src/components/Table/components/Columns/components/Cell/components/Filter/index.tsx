/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import * as I from './interfaces';
import * as S from './styles';

const Filter: React.FC<I.IFilter> = ({ handleApply, handleCancel, id, filter }) => {
  return (
    <S.container>
      <S.Input id={id} placeholder="Insira o valor" />

      <S.RowContainer>
        <S.Button
          onClick={handleCancel}
          style={{
            border: `1px solid ${!filter ? '#a5b4fc' : '#a5326b'}`,
            backgroundColor: !filter ? '#1c2127' : '#a5326b'
          }}>
          <S.Label style={{ color: !filter ? '#a5b4fc' : '#ffffff' }}>
            {filter ? 'Remove' : 'Cancel'}
          </S.Label>
        </S.Button>

        <S.Button
          onClick={handleApply((document.getElementById(id) as any)?.value)}
          style={{ border: '1px solid #a5b4fc', backgroundColor: '#a5b4fc' }}>
          <S.Label style={{ color: '#1c2127' }}>Apply</S.Label>
        </S.Button>
      </S.RowContainer>
    </S.container>
  );
};

export default Filter;
