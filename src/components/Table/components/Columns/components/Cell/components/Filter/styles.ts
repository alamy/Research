import styled from 'styled-components';

export const container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  height: 100%;
  opacity: 0.7;

  :hover {
    opacity: 1;
  }
`;

export const Input = styled.input`
  width: 95%;
  height: 30px;
  font-size: 14px;
  text-align: center;
  background-color: #0c203c;
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  padding: 0px 5px;
  border: 0;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 50px;
`;

export const Button = styled.div`
  display: flex;
  width: 45%;
  height: 60%;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.p`
  font-size: 12px;
  text-align: center;
  font-weight: 900;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;
