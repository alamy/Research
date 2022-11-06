import styled from 'styled-components';
import { CELL_HEIGHT, CELL_WIDTH } from 'hooks/Table/consants';

interface LabelProps {
  isNumeric: boolean;
  isPositive: boolean;
  isNegative: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: ${CELL_WIDTH}px;
  height: ${CELL_HEIGHT}px;
  justify-content: center;
`;

export const Label = styled.p<LabelProps>`
  font-size: 14px;
  text-overflow: ellipsis;
  color: ${({ theme, isNegative, isNumeric, isPositive }) => {
    if (!isNumeric || (!isPositive && !isNegative)) return theme.colors.text;
    if (isPositive) return theme.colors.activeGreen;
    return '#ec4899';
  }};
  font-weight: 900;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;
