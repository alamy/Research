import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
`;
