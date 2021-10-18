import styled from "styled-components";

export const StyledTitle = styled.h1`
  background-color: ${({ theme }) => theme.palette.success.light};
  color: ${({ theme }) => theme.palette.success.contrastText};
`;
