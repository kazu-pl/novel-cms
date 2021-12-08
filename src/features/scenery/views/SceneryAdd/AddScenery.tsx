import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import { Formik, Form, FormikHelpers } from "formik";
import { useLocalizedYup } from "common/yup";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Box from "@mui/material/Box";
import Button from "novel-ui/lib/buttons/Button";
import { useAppDispatch } from "common/store/hooks";
import { addNewScenery } from "features/scenery/store/scenerySlice";
import { useNavigate } from "react-router-dom";
import useLocalizedPath from "common/router/useLocalizedPath";
import { PATHS_SCENERY } from "common/constants/paths";
import { SuccessfulReqMsg, RequestScenery } from "types/novel-server.types";
import { useSnackbar } from "notistack";

const initialValues: RequestScenery = {
  title: "",
  description: "",
};

const SceneryAdd = () => {
  const { t, i18n } = useTranslation();
  const yup = useLocalizedYup();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { path } = useLocalizedPath();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
  });

  const handleSubmit = async (
    values: RequestScenery,
    actions: FormikHelpers<RequestScenery>
  ) => {
    try {
      const response = await dispatch(addNewScenery(values));

      const payload = response.payload as SuccessfulReqMsg;
      navigate(path(PATHS_SCENERY.LIST));
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
    <>
      <HelmetDecorator
        description={t("SceneryPages.add.metaData.descrption")}
        imageAlt={t("SceneryPages.add.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("SceneryPages.add.metaData.title")}
      />
      <DashboardLayoutWrapper title={t("SceneryPages.add.title")}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box maxWidth={700} width="100%">
                <Box mb={2}>
                  <TextFieldFormik
                    name="title"
                    type="text"
                    id="title"
                    label={t("form.enterTitle")}
                    fullWidth
                  />
                </Box>
                <Box mb={2}>
                  <TextFieldFormik
                    name="description"
                    type="text"
                    id="description"
                    label={t("form.enterDescription")}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Box>
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
                    {t("buttons.submit")}
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </DashboardLayoutWrapper>
    </>
  );
};

export default SceneryAdd;
