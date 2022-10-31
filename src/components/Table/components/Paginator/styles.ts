import styled from 'styled-components';

interface PageContainerProps {
  selected: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const PageContainer = styled.div<PageContainerProps>`
  position: relative;
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  transition: 0.2s;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? 'rgba(100, 100, 100, 0.5)' : undefined)};

  :hover {
    background-color: rgba(100, 100, 100, 0.5);
  }
`;

export const Page = styled.p`
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.poppins};
`;
