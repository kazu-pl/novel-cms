import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import HelmetDecorator from "components/HelmetDecorator";
import { Act, SuccessfulReqMsg } from "types/novel-server.types";
import { useTranslation } from "react-i18next";
import { Formik, Form, FormikHelpers, FieldArray } from "formik";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import {
  selectActDictionary,
  fetchActsDictionary,
  postActs,
} from "features/act/store/actSlice";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import ActScenes from "./ActScenes";
import Button from "novel-ui/lib/buttons/Button";
import { useLocalizedYup } from "common/yup";
import { createSceneValidationSchema } from "./NewSceneForm";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import useLocalizedPath from "common/router/useLocalizedPath";
import { PATHS_ACT } from "common/constants/paths";

const initialValues: Act = {
  title: "",
  description: "",
  type: "normal",
  nextActId: "",
  scenes: [],
};

const CheckValues = (values: Act) => {
  useEffect(() => {
    console.log({ values });
  }, [values]);
  return <div></div>;
};

const ActAdd = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const yup = useLocalizedYup();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { path } = useLocalizedPath();

  const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    nextActId: yup.string(),
    type: yup
      .string()
      .oneOf(
        ["start", "normal", "end"] as Act["type"][],
        "Start | normal | end"
      )
      .required(),
    scenes: yup.array().of(createSceneValidationSchema(yup)).required(),
  });

  const actDictionary = useAppSelector(selectActDictionary);
  const isDistionaryFetching = useAppSelector(
    (state) => state.act.actsDictionary.isFetching
  );

  const handleSubmit = async (values: Act, actions: FormikHelpers<Act>) => {
    console.log({ values });

    try {
      const response = await dispatch(postActs(values));
      const payload = response.payload as SuccessfulReqMsg;
      navigate(path(PATHS_ACT.LIST));
      enqueueSnackbar(payload.message, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchActsDictionary());
  }, [dispatch]);

  return (
    <>
      <HelmetDecorator
        description={t("actsPages.add.metaData.descrption")}
        imageAlt={t("actsPages.add.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("actsPages.add.metaData.title")}
      />
      <DashboardLayoutWrapper title={t("actsPages.add.title")}>
        {isDistionaryFetching ? (
          <div>Loading</div>
        ) : (
          <>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <CheckValues {...values} />
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
                        fullWidth
                      />
                    </Box>

                    <Box mb={2}>
                      <TextFieldFormik
                        name="type"
                        select
                        id="type"
                        fullWidth
                        label="type"
                      >
                        {(["start", "normal", "end"] as Act["type"][]).map(
                          (item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          )
                        )}
                      </TextFieldFormik>
                    </Box>

                    {actDictionary && (
                      <Box mb={2}>
                        <TextFieldFormik
                          name="nextActId"
                          select
                          clearable
                          id="nextActId"
                          fullWidth
                          label="nextActId"
                        >
                          {actDictionary.map((item, index) => (
                            <MenuItem key={item.id || index} value={item.id}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </TextFieldFormik>
                      </Box>
                    )}
                  </Box>
                  <FieldArray
                    name="scenes"
                    render={(props) => <ActScenes {...props} />}
                  />
                  <Box maxWidth={700} width="100%">
                    <Box
                      mt={2}
                      width="100%"
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        isLoading={isSubmitting}
                      >
                        {t("buttons.add")}
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </>
        )}
      </DashboardLayoutWrapper>
    </>
  );
};

export default ActAdd;
