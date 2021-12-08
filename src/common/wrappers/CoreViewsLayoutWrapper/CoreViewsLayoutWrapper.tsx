import Box from "@mui/material/Box";
import { StyledLoginPageWrapper } from "./CoreViewsLayoutWrapper.styled";
import LangSwitcher from "components/LangSwitcher";
import Typography from "@mui/material/Typography";

export interface CoreViewsLayoutWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const CoreViewsLayoutWrapper = ({
  children,
  title,
  description,
}: CoreViewsLayoutWrapperProps) => {
  return (
    <StyledLoginPageWrapper>
      <Box
        sx={{
          position: "absolute",
          right: (theme) => theme.spacing(1),
          top: (theme) => theme.spacing(1),
        }}
      >
        <LangSwitcher />
      </Box>

      <Box
        maxWidth={330}
        width="100%"
        p={4}
        borderRadius={4}
        bgcolor="white"
        textAlign="center"
      >
        <Box pb={2}>
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
        </Box>
        {description && (
          <Box pb={2}>
            <Typography variant="body1" component="p">
              {description}
            </Typography>
          </Box>
        )}

        {children}
      </Box>
    </StyledLoginPageWrapper>
  );
};

export default CoreViewsLayoutWrapper;
