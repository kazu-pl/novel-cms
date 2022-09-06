import Box from "@mui/material/Box";
import { useLocalizedYup } from "common/yup";
import { Formik, Form } from "formik";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import CheckboxFormik from "novel-ui/lib/formik/CheckboxFormik";
import Button from "novel-ui/lib/buttons/Button";
import { handleRememberMe, login } from "core/store/userSlice";
import { useAppDispatch } from "common/store/hooks";
import { RequestLoginCredentials } from "types/novel-server.types";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { PATHS_CORE, PATHS_DASHBOARD } from "common/constants/paths";
import { useEffect } from "react";
import { getTokens, isTokenExpired } from "common/auth/tokens";
import { useSnackbar } from "notistack";
import useLocalizedPath from "common/router/useLocalizedPath";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import CoreViewsLayoutWrapper, {
  LowerFormLink,
} from "common/wrappers/CoreViewsLayoutWrapper";

export const urlLogoutReasonQuery = {
  key: "reason",
  value: "refreshtokenexpired",
};
export const urlFromQuery = "from";

interface LoginFormValues extends RequestLoginCredentials {
  rememberMe: boolean;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: true,
};

const LoginView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { path } = useLocalizedPath();
  const { t, i18n } = useTranslation();
  const yup = useLocalizedYup();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    rememberMe: yup.boolean(),
  });

  useEffect(() => {
    if (
      location.state &&
      location.state[urlLogoutReasonQuery.key] &&
      location.state[urlLogoutReasonQuery.key] === urlLogoutReasonQuery.value
    ) {
      enqueueSnackbar(t("notifications.sessionEnd"), {
        variant: "info",
      });
    }
  }, [location, enqueueSnackbar, t]);

  const handleSubmit = async (values: LoginFormValues) => {
    if (!values.rememberMe) {
      // if you login and rememberMe is false, then add listener that will remove tokens from LocalStorage when user closes the tab or the whole browser
      window.addEventListener("unload", handleRememberMe);
    }

    try {
      await dispatch(login(values));
      if (location.state && location.state[urlFromQuery]) {
        navigate(location.state[urlFromQuery]); // I can't use path() here because location.state[urlFromQuery] can be from axiosInterceptor where I can't use PathWithoutLang to pass only path without lang prefix
      } else {
        navigate(path(PATHS_DASHBOARD.DASHBOARD));
      }
    } catch (err) {
      enqueueSnackbar(err as string, {
        variant: "error",
      });
    }
  };

  const tokens = getTokens();
  if (
    tokens &&
    !isTokenExpired(tokens.accessToken) &&
    !isTokenExpired(tokens.refreshToken)
  ) {
    return <Navigate to={path(PATHS_DASHBOARD.DASHBOARD)} replace />;
  }

  return (
    <>
      <HelmetDecorator
        description={t("loginPage.metaData.descrption")}
        imageAlt={t("loginPage.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("loginPage.metaData.title")}
      />
      <CoreViewsLayoutWrapper title={t("loginPage.title")}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextFieldFormik
                name="email"
                type="text"
                id="email"
                label={t("form.emailInputLabel")}
                fullWidth
              />
              <Box pt={2}>
                <TextFieldFormik
                  name="password"
                  type="password"
                  id="password"
                  label={t("form.passwordInputLabel")}
                  fullWidth
                />
              </Box>

              <Box pt={2} display="flex" justifyContent="flex-start">
                <CheckboxFormik
                  name="rememberMe"
                  id="rememberMe"
                  label={t("form.rememberMe")}
                />
              </Box>

              <Box pt={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  type="submit"
                  isLoading={isSubmitting}
                  fullWidth
                >
                  {t("buttons.submit")}
                </Button>
              </Box>
              <Box pt={2} display="flex" justifyContent="flex-end">
                <LowerFormLink
                  to={path(PATHS_CORE.PASSWORD_FORGOT)}
                  label={t("form.forgotPassword")}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </CoreViewsLayoutWrapper>
    </>
  );
};

export default LoginView;
