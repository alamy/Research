import styled from 'styled-components';
import { CELL_HEIGHT } from 'hooks/Table/consants';

interface ContainerProps {
  width: number;
}

export const Container = styled.div<ContainerProps>`
  max-height: 75vh;
  width: ${({ width }) => width}px;
  overflow: scroll;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  height: ${CELL_HEIGHT}px;
  margin-bottom: 5px;
`;
