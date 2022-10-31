import styled from 'styled-components';
import { FiArrowDown, FiArrowUp, FiFilter } from 'react-icons/fi';
import { CELL_HEIGHT, CELL_WIDTH } from 'hooks/Table/consants';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: ${CELL_WIDTH}px;
  height: ${CELL_HEIGHT}px;
  justify-content: center;
  cursor: pointer;

  :hover {
    background-color: rgba(100, 100, 100, 0.4);
  }
`;

export const Label = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 900;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;

export const ArrowUp = styled(FiArrowUp)`
  font-size: 18px;
  color: white;
  margin: 0px 2px;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    color: ${({ theme }) => theme.colors.activeGreen};
  }
`;

export const ArrowDown = styled(FiArrowDown)`
  font-size: 18px;
  color: white;
  margin: 0px 2px;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    color: ${({ theme }) => theme.colors.activeGreen};
  }
`;

export const Filter = styled(FiFilter)`
  font-size: 18px;
  color: white;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    color: ${({ theme }) => theme.colors.activeGreen};
  }
`;
