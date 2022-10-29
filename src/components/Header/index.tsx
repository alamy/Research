/* eslint-disable no-undef */
import React from 'react';

import * as S from './styles';

const Header: React.FC = () => {
  return (
    <S.Container>
      <S.Logo src={require('../../assets/logo.png')} />
    </S.Container>
  );
};

export default Header;
