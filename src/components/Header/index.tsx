/* eslint-disable no-undef */
import React, { useCallback } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import * as I from './interfaces';
import * as S from './styles';

const Header: React.FC<I.IHeader> = ({ items }) => {
  const renderItems = useCallback((): JSX.Element[] => {
    const width: number = (1 / items.length) * 100 - 1;

    const result: JSX.Element[] = items.map(({ label, onSelect }, idx) => {
      return (
        <S.ItemContainer width={width} key={idx.toString()} onClick={onSelect}>
          <S.ItemLabel>{label}</S.ItemLabel>
        </S.ItemContainer>
      );
    });

    return result;
  }, [items]);

  return (
    <S.Container>
      <S.Logo src={require('../../assets/logo-header.png')} alt="logo-header" />

      <S.ItemsContainer>{renderItems()}</S.ItemsContainer>

      <S.ProfilePicture>
        <AiOutlineUser size={35} color="white" />
      </S.ProfilePicture>
    </S.Container>
  );
};

export default Header;
