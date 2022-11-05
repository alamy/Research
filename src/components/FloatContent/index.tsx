import React from 'react';

import * as I from './interfaces';
import * as S from './styles';

const FloatContent: React.FC<I.IFloatContent> = ({ isVisible, style, children }) => {
  return (
    <S.Container style={style} isVisible={isVisible}>
      {children}
    </S.Container>
  );
};

export default FloatContent;
