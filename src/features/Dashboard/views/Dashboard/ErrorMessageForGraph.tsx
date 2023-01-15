import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { ErrorTypography } from "./Dashboard.styled";

export interface ErrorMessageForGraphProps {
  message: string;
  title: string;
}

const ErrorMessageForGraph = ({
  message,
  title,
}: ErrorMessageForGraphProps) => {
  return (
    <Box display={"flex"} flexDirection="column">
      <Typography variant="overline">{title}</Typography>
      <ErrorTypography variant="caption">{message}</ErrorTypography>
    </Box>
  );
};

export default ErrorMessageForGraph;
