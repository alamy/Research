import styled from 'styled-components';

export const Label = styled.p`
  font-size: 14px;
  text-align: center;
  vertical-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;
