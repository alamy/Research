import styled from 'styled-components';

interface ContainerProps {
  width: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: ${({ width }) => width}px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
