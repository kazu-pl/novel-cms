import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import { Formik, Form } from "formik";
import { useLocalizedYup } from "common/yup";
import {
  RequestRenewPassword,
  RequestUpdateUser,
} from "types/novel-server.types";
import {
  fetchUserData,
  selectUserProfile,
  updateUserData,
  updateUserPassword,
} from "core/store/userSlice";
import { useAppSelector, useAppDispatch } from "common/store/hooks";
import Box from "@mui/material/Box";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Button from "novel-ui/lib/buttons/Button";
import Typography from "@mui/material/Typography";

const Account = () => {
  const { t, i18n } = useTranslation();
  const yup = useLocalizedYup();
  const userData = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();

  const initialValues: RequestUpdateUser = {
    email: userData?.email || "",
    name: userData?.name || "",
    surname: userData?.surname || "",
  };

  const initialPasswordValues: RequestRenewPassword = {
    password: "",
    repeatedPassword: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    surname: yup.string().required(),
  });

  const validationPasswordSchema = yup.object({
    password: yup.string().required(),
    repeatedPassword: yup.string().required(),
  });

  const onSubmit = async (values: typeof initialValues) => {
    try {
      await dispatch(updateUserData(values));
      dispatch(fetchUserData());
      alert("updated Successfully");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const onSubmitPasswords = async (values: typeof initialPasswordValues) => {
    try {
      await dispatch(updateUserPassword(values));
      alert("password updated Successfully");
    } catch (err: any) {
      alert(err);
    }
  };

  return (
    <>
      <HelmetDecorator
        description={t("accountPage.metaData.descrption")}
        imageAlt={t("accountPage.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("accountPage.metaData.title")}
      />
      <DashboardLayoutWrapper title={t("accountPage.title")}>
        <Typography variant="overline">
          {t("accountPage.forms.account.title")}
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Box maxWidth={700}>
              <Form>
                <Box pt={2}>
                  <TextFieldFormik
                    name="email"
                    type="text"
                    id="email"
                    label={t("form.emailInputLabel")}
                    fullWidth
                  />
                </Box>
                <Box pt={2}>
                  <TextFieldFormik
                    name="name"
                    type="text"
                    id="text"
                    label={t("form.nameInputLabel")}
                    fullWidth
                  />
                </Box>
                <Box pt={2}>
                  <TextFieldFormik
                    name="surname"
                    type="text"
                    id="text"
                    label={t("form.surnameInputLabel")}
                    fullWidth
                  />
                </Box>
                <Box pt={2} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    {t("buttons.submit")}
                  </Button>
                </Box>
              </Form>
            </Box>
          )}
        </Formik>

        <Box pt={2}>
          <Typography variant="overline">
            {" "}
            {t("accountPage.forms.password.title")}
          </Typography>
          <Formik
            initialValues={initialPasswordValues}
            onSubmit={onSubmitPasswords}
            validationSchema={validationPasswordSchema}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Box maxWidth={700}>
                <Form>
                  <Box pt={2}>
                    <TextFieldFormik
                      name="password"
                      type="password"
                      id="password"
                      label={t("form.passwordInputLabel")}
                      fullWidth
                    />
                  </Box>
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
                    >
                      {t("buttons.submit")}
                    </Button>
                  </Box>
                </Form>
              </Box>
            )}
          </Formik>
        </Box>
      </DashboardLayoutWrapper>
    </>
  );
};

export default Account;
