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
      <S.DropItem key={idx.toString()} onClick={onSelect(item)}>
        <S.DropLabel selected={!!selected && selected.id === item.id}>{item.label}</S.DropLabel>
      </S.DropItem>
    ));
    return result;
  }, [items, onSelect, selected]);

  return (
    <S.Container onClick={toggleState} style={containerStyle}>
      <S.Label selected={!!selected}>{selected ? selected.label : items[0]?.label}</S.Label>
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
