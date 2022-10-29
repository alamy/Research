import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
