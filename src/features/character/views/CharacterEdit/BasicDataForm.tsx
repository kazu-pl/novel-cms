import { RequestCharacter, SuccessfulReqMsg } from "types/novel-server.types";
import { useAppSelector, useAppDispatch } from "common/store/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import {
  fetchSingleCharacter,
  selectSingleCharacterData,
  updateCharacterBasicData,
} from "features/character/store/characterSlice";
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
  onCancelBtnClick?: (values: RequestCharacter) => void;
  descriptionTextAreaRef?: React.RefObject<HTMLTextAreaElement> | null;
  initialValues?: RequestCharacter;
}

const BasicDataForm = ({
  maxWidth,
  onSubmitSideEffect,
  onCancelBtnClick,
  descriptionTextAreaRef,
  initialValues,
}: BasicDataFormProps) => {
  const character = useAppSelector(selectSingleCharacterData);
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;
  const { t } = useTranslation();
  const yup = useLocalizedYup();
  const { enqueueSnackbar } = useSnackbar();

  const initialBasicDataValues: RequestCharacter = {
    title:
      typeof initialValues?.title === "string"
        ? initialValues?.title
        : character?.title || "",
    description:
      typeof initialValues?.description === "string"
        ? initialValues?.description
        : character?.description || "",
  };

  const validationBasicDataSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
  });

  const handleSubmitBasicData = async (
    values: RequestCharacter,
    actions: FormikHelpers<RequestCharacter>
  ) => {
    try {
      const response = await dispatch(
        updateCharacterBasicData({ values, id: character!._id })
      );
      const payload = response.payload as SuccessfulReqMsg;

      enqueueSnackbar(payload.message, {
        variant: "success",
      });
      dispatch(fetchSingleCharacter(id));
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
            <Box
              maxWidth={maxWidth || 700}
              width="100%"
              display="flex"
              flexDirection="column"
            >
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
                  inputRef={descriptionTextAreaRef} // pass ref here to focus this input
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
