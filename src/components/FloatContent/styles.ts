import styled from 'styled-components';

interface ContainerProps {
  isVisible: boolean;
}

export const Container = styled.div<ContainerProps>`
  flex-direction: column;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.secondary};
  min-width: 100px;
  overflow: hidden;
  z-index: ${({ isVisible }) => (isVisible ? 999 : -1)};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: 0.5s;
`;
