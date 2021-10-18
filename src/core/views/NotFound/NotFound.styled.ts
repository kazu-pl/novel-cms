import styled from "styled-components";

export const StyledTitle = styled.h1`
  background-color: ${({ theme }) => theme.palette.error.light};
  color: ${({ theme }) => theme.palette.error.contrastText};
`;
