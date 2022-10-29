import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.header};
  display: flex;
  align-items: center;
  height: 90px;
  width: 100%;
  padding: 0px 20px;
  justify-content: center;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.05);
`;

export const Logo = styled.img`
  width: 10%;
  height: 100%;
  object-fit: contain;
`;
