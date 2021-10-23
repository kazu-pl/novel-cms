import CoreViewsLayoutWrapper from "common/wrappers/CoreViewsLayoutWrapper";
import { Formik, Form } from "formik";
import { useLocalizedYup } from "common/yup";
import { RequestRenewPassword } from "types/novel-server.types";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Button from "novel-ui/lib/buttons/Button";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import HelmetDecorator from "components/HelmetDecorator";
import { resetUserPassword } from "core/store/userSlice";
import { useAppDispatch } from "common/store/hooks";
import { useParams, useHistory } from "react-router-dom";
import useLocalizedPath from "common/router/useLocalizedPath";
import { PATHS_CORE } from "common/constants/paths";

const initialValues: RequestRenewPassword = {
  password: "",
  repeatedPassword: "",
};

const ResetPassword = () => {
  const yup = useLocalizedYup();
  const { path } = useLocalizedPath();
  const { t } = useTranslation();
  let { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const validationSchema = yup.object({
    password: yup.string().required(),
    repeatedPassword: yup.string().required(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await dispatch(resetUserPassword({ ...values, userId }));
      const payload = response.payload as { message: string };
      alert(payload.message);
      history.push(path(PATHS_CORE.LOGIN));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <CoreViewsLayoutWrapper title={t("resetPasswordPage.title")}>
      <HelmetDecorator
        description={t("resetPasswordPage.metaData.descrption")}
        imageAlt={t("resetPasswordPage.metaData.imageAlt")}
        title={t("resetPasswordPage.metaData.title")}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextFieldFormik
              name="password"
              type="password"
              id="password"
              label={t("form.passwordInputLabel")}
              fullWidth
            />
            <Box pt={2}>
              <TextFieldFormik
                name="repeatedPassword"
                type="password"
                id="repeatedPassword"
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
          </Form>
        )}
      </Formik>
    </CoreViewsLayoutWrapper>
  );
};

export default ResetPassword;
