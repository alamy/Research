import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  max-height: 78vh;
  max-width: 80%;
  border-radius: 30px;
  padding: 0px 0px;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(20, 20, 20, 0.3);
  transition: 1s;
`;

export const SupContentContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  transition: 1s;
  padding-bottom: 200px;
`;
