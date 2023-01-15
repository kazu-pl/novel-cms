import Paper from "@mui/material/Paper";
import { styled as muiStyled } from "@mui/material";
import Typography from "@mui/material/Typography";

export const Item = muiStyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,

  height: `100%`,
}));

export const ErrorTypography = muiStyled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
}));
