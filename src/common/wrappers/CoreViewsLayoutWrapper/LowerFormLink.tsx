import { Link } from "react-router-dom";
import { StyledForgotPasswordLink } from "./LowerFormLink.styled";

export const LowerFormLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <StyledForgotPasswordLink component={Link} to={to}>
      {label}
    </StyledForgotPasswordLink>
  );
};

export default LowerFormLink;
