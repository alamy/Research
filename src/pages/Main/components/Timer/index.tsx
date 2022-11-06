import React, { useCallback, useEffect, useState } from 'react';

import { TIME_TO_UPDATE } from 'hooks/Table/consants';
import { useTableManager } from 'hooks';
import * as U from './utils';
import * as S from './styles';

const Timer: React.FC = () => {
  const { prepareTableData } = useTableManager();
  const [timer, setTimer] = useState<number>(0);
  const [updating, setUpdating] = useState<boolean>();
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date>();
  const hours: number = Math.floor(timer / 3600);
  const minutes: number = Math.floor(timer / 60);
  const seconds: number = timer % 60;

  const handleUpdate = useCallback(async () => {
    if (timer > 0) return;
    setUpdating(true);
    await prepareTableData();
    setTimer(TIME_TO_UPDATE);
    setLastUpdatedAt(new Date());
    setUpdating(false);
  }, [timer, prepareTableData]);

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <S.Container>
      {updating ? (
        <S.Label>Atualizando...</S.Label>
      ) : (
        <>
          {lastUpdatedAt && <S.ThinLabel>Atualizado às {U.formatHour(lastUpdatedAt)}</S.ThinLabel>}
          <S.Label>
            Próxima atualização em {U.formatTime(hours)}:{U.formatTime(minutes)}:
            {U.formatTime(seconds)}
          </S.Label>
        </>
      )}
    </S.Container>
  );
};

export default Timer;
