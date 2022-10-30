import styled from 'styled-components';

export const Container = styled.div`
  height: 1000px;
  width: ${22 * 120}px;
  overflow-y: scroll !important;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
`;

export const Cell = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 50px;
  justify-content: center;
  margin: 0px 10px;
`;
