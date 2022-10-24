import styled, { css } from "styled-components";

export const Container = styled.div<{
  isCurrentlyDragging?: boolean;
  dragColor?: string;
  selectHighlightColor?: string;
  isDragDisabled?: boolean;
  dragDisabledColor?: string;
}>`
  cursor: pointer;
  padding: 0 4px;
  display: flex;
  justify-content: space-between;
  ${({ isCurrentlyDragging, dragColor }) =>
    isCurrentlyDragging &&
    css`
      background-color: ${dragColor ? dragColor : "#E6F7FF"};
    `};
  border: 1px solid transparent;
  transition: border 1s ease-in;

  ${({ isDragDisabled, dragDisabledColor }) =>
    isDragDisabled &&
    css`
      cursor: not-allowed;
      background-color: ${dragDisabledColor || "#f5f5f5"};
    `};

  &.active {
    border: 1px solid
      ${({ selectHighlightColor }) => selectHighlightColor || `#1890FF`};
  }

  .dragIcon {
    opacity: 0;
  }

  &:hover .dragIcon {
    opacity: ${({ isDragDisabled }) => (isDragDisabled ? 0 : 1)};
  }

  ${({ isCurrentlyDragging, isDragDisabled }) =>
    isCurrentlyDragging &&
    css`
      & .dragIcon {
        opacity: ${isDragDisabled ? 0 : 1};
      }
    `}
`;
