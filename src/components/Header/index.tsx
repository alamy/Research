import { useHeaderManager } from 'hooks/Header';
import { IHeaderItemModel } from 'hooks/Header/interfaces';
/* eslint-disable no-undef */
import React, { useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';

import * as S from './styles';

const Header: React.FC = () => {
  const { headerItems, selectedHeaderId, selectHeaderItem } = useHeaderManager();
  const isMobile = useMediaQuery({
    query: '(max-width: 700px)'
  });

  const onSelect = useCallback(
    (item: IHeaderItemModel) => () => {
      selectHeaderItem(item.id);
    },
    [selectHeaderItem]
  );

  const renderItems = useCallback((): JSX.Element[] => {
    const width: number = (1 / headerItems.length) * 100 - 1;

    const result: JSX.Element[] = headerItems.map((item, idx) => {
      return (
        <S.ItemContainer width={width} key={idx.toString()} onClick={onSelect && onSelect(item)}>
          <S.ItemLabel selected={item.id === selectedHeaderId}>{item.label}</S.ItemLabel>
        </S.ItemContainer>
      );
    });

    return result;
  }, [headerItems, onSelect, selectedHeaderId]);

  return (
    <S.Container>
      <S.Logo src={require('../../assets/logo-header.png')} alt="logo-header" />

      {!isMobile && <S.ItemsContainer>{renderItems()}</S.ItemsContainer>}

      <S.UserIcon />
    </S.Container>
  );
};

export default Header;
