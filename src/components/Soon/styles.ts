import { FiSettings } from 'react-icons/fi';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(FiSettings)`
  font-size: 50px;
  color: white;
`;

export const Label = styled.p`
  font-size: 20px;
  text-align: center;
  vertical-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;
