import styled from "styled-components";

export const BackgroundWrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Container = styled.div`
  position: relative;
  min-height: 740px;
  flex-grow: 1;
`;

export const Actions = styled.div`
  visibility: hidden;
  position: absolute;
  top: 4px;
  right: 6px;
  cursor: pointer;
  svg {
    margin-left: 4px;
  }
`;

export const Item = styled.div`
  background: lightgray;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  .react-resizable-handle {
    visibility: hidden;
  }
  div {
    overflow: hidden;
    max-height: 100%;
  }
  &:hover {
    ${Actions} {
      visibility: visible;
    }
    .react-resizable-handle {
      visibility: visible;
    }
  }
`;

export const AddItem = styled.div`
  height: 48px;
  width: 120px;
  line-height: 48px;
  background: lightgray;
  text-align: center;
  margin-bottom: 40px;
  float: left;
`;
