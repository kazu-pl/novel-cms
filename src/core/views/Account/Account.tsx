import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import { Formik, Form, FormikHelpers } from "formik";
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
  updateUserAvatar,
  deleteUserAvatar,
} from "core/store/userSlice";
import { useAppSelector, useAppDispatch } from "common/store/hooks";
import Box from "@mui/material/Box";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Button from "novel-ui/lib/buttons/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { API_URL } from "common/constants/env";
import { useState } from "react";

import { useRef } from "react";

import FileInputFormik, {
  ExtendedFile,
} from "novel-ui/lib/formik/FileInputFormik";

interface FileFormValues {
  file: ExtendedFile | null;
}

const Account = () => {
  const { t, i18n } = useTranslation();
  const yup = useLocalizedYup();
  const userData = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();
  const [isDeleteAvatarBtnLoading, setIsDeleteAvatarBtnLoading] =
    useState(false);

  const initialValues: RequestUpdateUser = {
    email: userData?.email || "",
    name: userData?.name || "",
    surname: userData?.surname || "",
  };

  const initialPasswordValues: RequestRenewPassword = {
    password: "",
    repeatedPassword: "",
  };

  const initialFileValues: FileFormValues = {
    file: null,
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

  const validationFileSchema = yup.object({
    file: yup.object().required().nullable(),
  });

  const inputFileRef = useRef<HTMLInputElement | null>(null);

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

  const onFileSubmit = async (
    values: typeof initialFileValues,
    helpers: FormikHelpers<FileFormValues>
  ) => {
    if (!inputFileRef.current || !inputFileRef.current.files) return;

    const fileFromInputRef = inputFileRef.current.files[0];

    const formData = new FormData();
    formData.append("file", fileFromInputRef);

    await dispatch(updateUserAvatar(formData));
    helpers.resetForm();
    dispatch(fetchUserData());
  };

  const handleDeleteAvatar = async () => {
    setIsDeleteAvatarBtnLoading(true);
    try {
      await dispatch(deleteUserAvatar());
      dispatch(fetchUserData());
      setIsDeleteAvatarBtnLoading(false);
    } catch (err) {
      console.log({ err });
      setIsDeleteAvatarBtnLoading(false);
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
          {t("accountPage.forms.avatar.title")}
        </Typography>

        <Box pt={2} pb={2} maxWidth={700}>
          <Box mb={2}>
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={
                userData?.avatar ? `${API_URL}${userData?.avatar}` : undefined
              }
              children={userData?.avatar ? undefined : userData?.name[0]}
            />
          </Box>
          <Formik
            initialValues={initialFileValues}
            onSubmit={onFileSubmit}
            validationSchema={validationFileSchema}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                <FileInputFormik
                  name="file"
                  id="avatar-image"
                  accept="images"
                  inputRef={inputFileRef}
                  text={t("buttons.selectFile")}
                />
                <Box
                  pt={1}
                  alignSelf="flex-end"
                  maxWidth="100%"
                  width="100%"
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Button
                    variant="contained"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    {t("buttons.update")}
                  </Button>

                  <Button
                    onClick={handleDeleteAvatar}
                    variant="contained"
                    style={{ marginLeft: 25 }}
                    isLoading={isDeleteAvatarBtnLoading}
                  >
                    {t("buttons.delete")}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Box maxWidth={700}>
              <Form>
                <Typography variant="overline">
                  {t("accountPage.forms.account.title")}
                </Typography>
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
