import styled from 'styled-components';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: flex-start;
`;

export const Label = styled.p`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;

export const ThinLabel = styled.p`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.roboto};
  margin-right: 15px;
`;
