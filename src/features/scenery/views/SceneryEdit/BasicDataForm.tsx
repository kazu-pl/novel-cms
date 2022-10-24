import { RequestScenery, SuccessfulReqMsg } from "types/novel-server.types";
import { useAppSelector, useAppDispatch } from "common/store/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import {
  fetchSingleScenery,
  selectSingleSceneryData,
  updateSceneryBasicData,
} from "features/scenery/store/scenerySlice";
import { useParams } from "react-router-dom";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Box from "@mui/material/Box";
import Button from "novel-ui/lib/buttons/Button";
import { useTranslation } from "react-i18next";
import { useLocalizedYup } from "common/yup";
import { useSnackbar } from "notistack";

interface BasicDataFormProps {
  maxWidth?: number | string;
  onSubmitSideEffect?: () => void;
  onCancelBtnClick?: (values: RequestScenery) => void;
  descriptionTextAreaRef?: React.RefObject<HTMLTextAreaElement> | null;
  initialValues?: RequestScenery;
}
const BasicDataForm = ({
  maxWidth,
  onSubmitSideEffect,
  onCancelBtnClick,
  descriptionTextAreaRef,
  initialValues,
}: BasicDataFormProps) => {
  const scenery = useAppSelector(selectSingleSceneryData);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { t } = useTranslation();
  const yup = useLocalizedYup();
  const { enqueueSnackbar } = useSnackbar();

  const initialBasicDataValues: RequestScenery = {
    title:
      typeof initialValues?.title === "string"
        ? initialValues.title
        : scenery?.title || "",
    description:
      typeof initialValues?.description === "string"
        ? initialValues.description
        : scenery?.description || "",
  };

  const validationBasicDataSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
  });

  const handleSubmitBasicData = async (
    values: RequestScenery,
    actions: FormikHelpers<RequestScenery>
  ) => {
    try {
      const response = await dispatch(
        updateSceneryBasicData({ values, id: scenery!._id })
      );
      const payload = response.payload as SuccessfulReqMsg;
      enqueueSnackbar(payload.message, {
        variant: "success",
      });
      dispatch(fetchSingleScenery(id!));
      onSubmitSideEffect && onSubmitSideEffect();
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={initialBasicDataValues}
        onSubmit={handleSubmitBasicData}
        validationSchema={validationBasicDataSchema}
        enableReinitialize
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Box maxWidth={maxWidth || 700} width="100%">
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
                  inputRef={descriptionTextAreaRef}
                  name="description"
                  type="text"
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
                {onCancelBtnClick && (
                  <Box mr={1}>
                    <Button
                      variant="text"
                      color="error"
                      onClick={(e) => {
                        onCancelBtnClick(values);
                      }}
                    >
                      {t("buttons.cancel")}
                    </Button>
                  </Box>
                )}
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
    </>
  );
};

export default BasicDataForm;
