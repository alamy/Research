import React from 'react';

import * as S from './styles';
import { useHeaderManager } from 'hooks/Header';
import Timer from '../Timer';
import OIGlobal from '../OIGlobal';

const TopContent: React.FC = () => {
  const { isTable } = useHeaderManager();
  if (!isTable()) return null;

  return (
    <S.Container>
      <OIGlobal />
      <Timer />
    </S.Container>
  );
};

export default TopContent;
