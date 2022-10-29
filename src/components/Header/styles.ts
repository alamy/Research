import styled from 'styled-components';

interface ItemProps {
  width: number;
}

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.header};
  display: flex;
  align-items: center;
  height: 90px;
  padding: 0px 5vw;
  justify-content: space-between;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.05);
`;

export const Logo = styled.img`
  width: 10%;
  height: 100%;
  object-fit: contain;
`;

export const ItemsContainer = styled.div`
  display: flex;
  height: 100%;
  width: 90%;
  padding: 0px 20px;
  justify-content: space-between;
`;

export const ItemContainer = styled.div<ItemProps>`
  width: ${({ width }) => width}%;
  transition: 0.2s;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover {
    transform: scale(1.05);
  }
`;

export const ItemLabel = styled.p`
  font-size: 1em;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.poppins};
`;

export const ProfilePicture = styled.div`
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 2.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  cursor: pointer;
`;
