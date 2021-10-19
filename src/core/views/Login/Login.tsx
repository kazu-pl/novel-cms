import { StyledLoginPageWrapper } from "./Login.styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import yup from "common/yup";
import { Formik, Form } from "formik";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Button from "novel-ui/lib/buttons/Button";
import { login } from "core/store/userSlice";
import { useAppDispatch } from "common/store/hooks";
import { RequestLoginCredentials } from "types/novel-server.types";
import { useHistory } from "react-router-dom";
import { PATHS_DASHBOARD } from "common/constants/paths";
import { useLayoutEffect } from "react";
import { getTokens, isAccessTokenExpired } from "common/auth/tokens";

const validationSchema = yup.object({
  login: yup.string().required(),
  password: yup.string().required(),
});

const initialValues: RequestLoginCredentials = {
  login: "",
  password: "",
};

const LoginView = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useLayoutEffect(() => {
    const tokens = getTokens();
    if (tokens && !isAccessTokenExpired(tokens.accessToken))
      history.push(PATHS_DASHBOARD.DASHBOARD);
  });

  const handleSubmit = async (values: RequestLoginCredentials) => {
    try {
      await dispatch(login(values));
      history.push(PATHS_DASHBOARD.DASHBOARD);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <StyledLoginPageWrapper>
      <Box
        minWidth={330}
        p={4}
        borderRadius={4}
        bgcolor="white"
        textAlign="center"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Typography variant="h5" component="h1">
                Login
              </Typography>
              <Box pt={2}>
                <TextFieldFormik
                  name="login"
                  type="text"
                  id="login"
                  label="Enter Your login"
                  fullWidth
                />
              </Box>
              <Box pt={2}>
                <TextFieldFormik
                  name="password"
                  type="password"
                  id="password"
                  label="Enter Your password"
                  fullWidth
                />
              </Box>
              <Box pt={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  type="submit"
                  isLoading={isSubmitting}
                  fullWidth
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </StyledLoginPageWrapper>
  );
};

export default LoginView;
