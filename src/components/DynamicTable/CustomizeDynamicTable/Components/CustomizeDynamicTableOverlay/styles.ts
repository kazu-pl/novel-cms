import styled from 'styled-components';

export const StyledPaper = styled.div`
  background: white;
  padding: 16px;
  min-width: 200px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

export const StyledActionBtnsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledColumnsWrapper = styled.div<{ marginYAxis: number }>`
  width: 100%;
  height: 180px;
  overflow-y: auto;
  margin: ${({ marginYAxis }) => `${marginYAxis}px 0`};
`;

export const StyledColumnsControlsWrapper = styled.div<{ mb: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: ${({ mb }) => mb}px;
`;
