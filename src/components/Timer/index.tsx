import { useTableManager } from 'hooks';
import React from 'react';

import * as U from './utils';
import * as S from './styles';

const Timer: React.FC = () => {
  const { timeToUpdate } = useTableManager();
  const hours: number = Math.floor(timeToUpdate / 3600);
  const minutes: number = Math.floor(timeToUpdate / 60);
  const seconds: number = timeToUpdate % 60;

  return (
    <S.Label>
      Próxima atualização em {U.formatTime(hours)}:{U.formatTime(minutes)}:{U.formatTime(seconds)}
    </S.Label>
  );
};

export default Timer;
