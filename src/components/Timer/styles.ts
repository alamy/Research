import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Label = styled.p`
  font-size: 14px;
  text-align: center;
  vertical-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;

export const ThinLabel = styled.p`
  font-size: 14px;
  text-align: center;
  vertical-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.roboto};
  margin-right: 15px;
`;
