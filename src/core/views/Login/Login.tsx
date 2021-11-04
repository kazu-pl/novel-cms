import Box from "@mui/material/Box";
import { useLocalizedYup } from "common/yup";
import { Formik, Form } from "formik";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Button from "novel-ui/lib/buttons/Button";
import { login } from "core/store/userSlice";
import { useAppDispatch } from "common/store/hooks";
import { RequestLoginCredentials } from "types/novel-server.types";
import { useHistory } from "react-router-dom";
import { PATHS_CORE, PATHS_DASHBOARD } from "common/constants/paths";
import { useLayoutEffect } from "react";
import { getTokens, isAccessTokenExpired } from "common/auth/tokens";

import useLocalizedPath from "common/router/useLocalizedPath";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import CoreViewsLayoutWrapper, {
  LowerFormLink,
} from "common/wrappers/CoreViewsLayoutWrapper";

const initialValues: RequestLoginCredentials = {
  email: "",
  password: "",
};

const LoginView = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { path } = useLocalizedPath();
  const { t, i18n } = useTranslation();
  const yup = useLocalizedYup();

  const validationSchema = yup.object({
    email: yup.string().email().required(),
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
    } catch (err) {
      alert(err);
    }
  };

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
                  to={PATHS_CORE.PASSWORD_FORGOT}
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
