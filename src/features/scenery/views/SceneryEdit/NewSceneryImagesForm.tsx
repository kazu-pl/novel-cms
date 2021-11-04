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
  addSceneryImages,
  fetchSingleScenery,
} from "features/scenery/store/scenerySlice";
import { useAppDispatch } from "common/store/hooks";
import { SuccessfulReqMsg } from "types/novel-server.types";

interface FormValues {
  files: ExtendedFile[] | null;
}

const initialMultipleFileValues: FormValues = {
  files: null,
};

const NewSceneryImagesForm = () => {
  const inputFilesRef = useRef<HTMLInputElement | null>(null);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const yup = useLocalizedYup();

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
        addSceneryImages({ id, values: formData })
      );
      const payload = response.payload as SuccessfulReqMsg;
      alert(payload.message);
      helpers.resetForm();
      dispatch(fetchSingleScenery(id));
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Formik
      initialValues={initialMultipleFileValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, values }) => (
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

export default NewSceneryImagesForm;
