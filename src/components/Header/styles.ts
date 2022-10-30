import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';

interface LabelProps {
  selected?: boolean;
}

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
  box-shadow: 0 5px 10px 0px rgba(10, 10, 10, 1);

  @media (max-width: 700px) {
    height: 50px;
  }
`;

export const Logo = styled.img`
  width: 10%;
  height: 100%;
  object-fit: contain;

  @media (max-width: 1380px) {
    width: 15%;
  }

  @media (max-width: 1000px) {
    width: 20%;
  }

  @media (max-width: 700px) {
    width: 30%;
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  height: 100%;
  width: 90%;
  padding: 0px 40px;
  justify-content: space-between;
`;

export const ItemContainer = styled.div<ItemProps>`
  display: flex;
  width: ${({ width }) => width}%;
  transition: 0.2s;
  height: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover {
    transform: scale(1.05);
  }
`;

export const ItemLabel = styled.p<LabelProps>`
  font-size: 0.9em;
  text-align: center;
  flex-wrap: wrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${({ theme, selected }) => (selected ? theme.colors.activeGreen : theme.colors.text)};
  font-family: ${({ theme }) => theme.fonts.poppins};

  @media (max-width: 1100px) {
    font-size: 0.7em;
  }

  @media (max-width: 850px) {
    font-size: 0.5em;
  }
`;

export const UserIcon = styled(AiOutlineUser)`
  font-size: 35px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  @media (max-width: 700px) {
    font-size: 30px;
  }
`;

export const ProfilePicture = styled.div`
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 2.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
