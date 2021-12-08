import { useLocalizedYup } from "common/yup";
import { Formik, Form, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import FileInputFormik, {
  ExtendedFile,
} from "novel-ui/lib/formik/FileInputFormik";
import Box from "@mui/material/Box";
import Button from "novel-ui/lib/buttons/Button";
import { useParams } from "react-router-dom";
import {
  addCharacterImages,
  fetchSingleCharacter,
} from "features/character/store/characterSlice";
import { useAppDispatch } from "common/store/hooks";
import { SuccessfulReqMsg } from "types/novel-server.types";
import { useSnackbar } from "notistack";

interface FormValues {
  files: ExtendedFile[] | null;
}

const initialMultipleFileValues: FormValues = {
  files: null,
};

const NewCharacterImagesForm = () => {
  const inputFilesRef = useRef<HTMLInputElement | null>(null);
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const yup = useLocalizedYup();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = yup.object({
    files: yup.array().of(yup.object()).min(1).required().nullable(),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    if (!inputFilesRef.current || !inputFilesRef.current.files) return;
    const filesFromInputRef = Array.from(inputFilesRef.current.files);

    const formData = new FormData();

    filesFromInputRef.forEach((file) => {
      formData.append("files", file);
    });
    try {
      const response = await dispatch(
        addCharacterImages({ id: id!, values: formData })
      );
      const payload = response.payload as SuccessfulReqMsg;
      enqueueSnackbar(payload.message, {
        variant: "success",
      });
      helpers.resetForm();
      dispatch(fetchSingleCharacter(id!));
    } catch (err) {
      enqueueSnackbar(err as string, {
        variant: "error",
      });
    }
  };

  return (
    <Formik
      initialValues={initialMultipleFileValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form encType="multipart/form-data">
          <FileInputFormik
            name="files"
            id="contained-button-file"
            accept="images"
            inputRef={inputFilesRef}
            multiple
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
            <Button variant="contained" type="submit" isLoading={isSubmitting}>
              {t("buttons.submit")}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default NewCharacterImagesForm;
