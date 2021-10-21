import { StyledLoginPageWrapper } from "./Login.styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocalizedYup } from "common/yup";
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
import LangSwitcher from "components/LangSwitcher";
import useLocalizedPath from "common/router/useLocalizedPath";
import { useTranslation } from "react-i18next";

const initialValues: RequestLoginCredentials = {
  login: "",
  password: "",
};

const LoginView = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { path } = useLocalizedPath();
  const { t } = useTranslation();
  const yup = useLocalizedYup();

  const validationSchema = yup.object({
    login: yup.string().required(),
    password: yup.string().required(),
  });

  useLayoutEffect(() => {
    const tokens = getTokens();
    if (tokens && !isAccessTokenExpired(tokens.accessToken))
      history.push(path(PATHS_DASHBOARD.DASHBOARD));
  });

  const handleSubmit = async (values: RequestLoginCredentials) => {
    try {
      await dispatch(login(values));
      history.push(path(PATHS_DASHBOARD.DASHBOARD));
    } catch (err: any) {
      alert(err.message);
    }
  };

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
                {t("loginPage.title")}
              </Typography>
              <Box pt={2}>
                <TextFieldFormik
                  name="login"
                  type="text"
                  id="login"
                  label={t("loginPage.form.loginInputLabel")}
                  fullWidth
                />
              </Box>
              <Box pt={2}>
                <TextFieldFormik
                  name="password"
                  type="password"
                  id="password"
                  label={t("loginPage.form.passwordInputLabel")}
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
                  {t("loginPage.submitButton")}
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
