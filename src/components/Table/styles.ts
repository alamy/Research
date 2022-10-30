import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  max-height: 80vh;
  max-width: 80%;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0px 0px;
  flex-direction: column;
`;

export const SupContentContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow-x: scroll;
`;
