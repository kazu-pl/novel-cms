import styled from "styled-components";

export const StyledWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.breakpoints.values["xl"]}px) {
    flex-direction: row;
  }
`;

export const StyledControlsWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  margin-right: ${({ theme }) => theme.spacing(1)};
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.values["xl"]}px) {
    width: 50%;
  }
`;

export const StyledPreviewBoxWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing(1)};
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.values["xl"]}px) {
    width: 50%;
  }
`;

export const StyledDialogsCounter = styled.span`
  font-weight: 500;
`;
