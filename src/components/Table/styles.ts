import styled from 'styled-components';

export const Container = styled.div`
  height: 80vh;
  width: 90%;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 0px 0px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(100, 100, 100, 0.3);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  margin: 50px 0px;
  background-color: rgba(0, 0, 0, 0.5);
`;
