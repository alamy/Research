import React from 'react';

import * as S from './styles';
import Timer from '../Timer';
import OIGlobal from '../OIGlobal';

const TopContent: React.FC = () => {
  return (
    <S.Container>
      <OIGlobal />
      <Timer />
    </S.Container>
  );
};

export default TopContent;
