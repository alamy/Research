import styled from 'styled-components';
import { CELL_HEIGHT } from 'hooks/Table/consants';

interface ContainerProps {
  width: number;
}

export const Container = styled.div<ContainerProps>`
  max-height: 75vh;
  min-height: 70px;
  width: ${({ width }) => width}px;
  overflow: scroll;
`;

export const LoadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  height: ${CELL_HEIGHT}px;
  margin-bottom: 5px;
  transition: 0.2s;
  cursor: pointer;
`;
