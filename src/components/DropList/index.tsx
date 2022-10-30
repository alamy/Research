import React, { useCallback, useState } from 'react';

import * as I from './interfaces';
import * as S from './styles';

const DropList: React.FC<I.IDropList> = ({
  items,
  onSelect,
  selected,
  containerStyle,
  dropProps
}) => {
  const [opened, setOpened] = useState<boolean>(false);

  const toggleState = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  const renderItems = useCallback((): JSX.Element[] => {
    const result: JSX.Element[] = items.map((item, idx) => (
      <S.DropItem key={idx.toString()} onClick={() => console.log(item)}>
        <S.DropLabel>{item.label}</S.DropLabel>
      </S.DropItem>
    ));
    return result;
  }, [items]);

  return (
    <S.Container onClick={toggleState} style={containerStyle}>
      <S.Label>{items[0].label}</S.Label>
      {opened ? <S.ArrowUp /> : <S.ArrowDown />}

      {opened && (
        <S.DropDownContainer>
          <S.DropContainer style={dropProps}>{renderItems()}</S.DropContainer>
        </S.DropDownContainer>
      )}
    </S.Container>
  );
};

export default DropList;
