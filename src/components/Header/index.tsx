/* eslint-disable no-undef */
import React, { useCallback } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';

import * as I from './interfaces';
import * as S from './styles';

const Header: React.FC<I.IHeader> = ({ items, onSelect, selectedId }) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 700px)'
  });

  const renderItems = useCallback((): JSX.Element[] => {
    const width: number = (1 / items.length) * 100 - 1;

    const result: JSX.Element[] = items.map((item, idx) => {
      return (
        <S.ItemContainer width={width} key={idx.toString()} onClick={onSelect && onSelect(item)}>
          <S.ItemLabel selected={item.id === selectedId}>{item.label}</S.ItemLabel>
        </S.ItemContainer>
      );
    });

    return result;
  }, [items, onSelect, selectedId]);

  return (
    <S.Container>
      <S.Logo src={require('../../assets/logo-header.png')} alt="logo-header" />

      {!isMobile && <S.ItemsContainer>{renderItems()}</S.ItemsContainer>}

      <S.UserIcon />
    </S.Container>
  );
};

export default Header;
