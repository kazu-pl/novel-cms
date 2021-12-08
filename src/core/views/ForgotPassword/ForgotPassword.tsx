import CoreViewsLayoutWrapper, {
  LowerFormLink,
} from "common/wrappers/CoreViewsLayoutWrapper";
import { Formik, Form } from "formik";
import { useLocalizedYup } from "common/yup";
import {
  RequestRemindPasswordCredentials,
  SuccessfulReqMsg,
} from "types/novel-server.types";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Button from "novel-ui/lib/buttons/Button";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import { PATHS_CORE, PATHS_DASHBOARD } from "common/constants/paths";
import HelmetDecorator from "components/HelmetDecorator";
import useLocalizedPath from "common/router/useLocalizedPath";
import { sendEmailToRemindPassword } from "core/store/userSlice";
import { useAppDispatch } from "common/store/hooks";
import { useSnackbar } from "notistack";

const initialValues: RequestRemindPasswordCredentials = {
  email: "",
};

const ForgotPassword = () => {
  const yup = useLocalizedYup();
  const { t } = useTranslation();
  const { path } = useLocalizedPath();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = yup.object({
    email: yup.string().email().required(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await dispatch(sendEmailToRemindPassword(values));
      const payload = response.payload as SuccessfulReqMsg;
      enqueueSnackbar(payload.message, {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(err as string, {
        variant: "error",
      });
    }
  };

  return (
    <CoreViewsLayoutWrapper
      title={t("forgotPassword.title")}
      description={t("forgotPassword.description")}
    >
      <HelmetDecorator
        description={t("forgotPassword.metaData.descrption")}
        imageAlt={t("forgotPassword.metaData.imageAlt")}
        title={t("forgotPassword.metaData.title")}
      />
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
            <Box pt={2} display="flex" justifyContent="space-between">
              <LowerFormLink
                to={path(PATHS_CORE.LOGIN)}
                label={`< ${t("forgotPassword.links.login")}`}
              />
              <LowerFormLink
                to={path(PATHS_DASHBOARD.DASHBOARD)}
                label={`${t("forgotPassword.links.dashboard")} >`}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </CoreViewsLayoutWrapper>
  );
};

export default ForgotPassword;
