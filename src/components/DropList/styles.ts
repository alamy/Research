import styled from 'styled-components';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

interface ILabelProps {
  selected: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 0;
  overflow: scroll;
`;

export const ArrowUp = styled(AiFillCaretUp)`
  font-size: 15px;
  color: white;
`;

export const ArrowDown = styled(AiFillCaretDown)`
  font-size: 15px;
  color: white;
`;

export const Label = styled.p<ILabelProps>`
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  margin-right: 5px;
  color: ${({ theme, selected }) => (selected ? theme.colors.activeGreen : theme.colors.text)};
  font-family: ${({ theme }) => theme.fonts.poppins};
`;

export const DropLabel = styled.p<ILabelProps>`
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  font-weight: 800;
  margin-right: 5px;
  color: ${({ theme, selected }) => (selected ? theme.colors.activeGreen : theme.colors.text)};
  font-family: ${({ theme }) => theme.fonts.poppins};
`;

export const DropDownContainer = styled.div``;

export const DropContainer = styled.div`
  flex-direction: column;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  padding: 5px;
  height: 100px;
  min-width: 100px;
  overflow: scroll;
  z-index: 999;
`;

export const DropItem = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;
  height: 10px;
  border-bottom: 0.5px solid #cececece;
`;
