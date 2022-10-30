import styled from 'styled-components';
import { FiArrowDown, FiArrowUp, FiFilter } from 'react-icons/fi';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 50px;
  justify-content: center;
  margin: 0px 10px;
`;

export const Label = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.poppins};
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
