import { Dialog } from "types/novel-server.types";
import { Formik, FieldArray } from "formik";
import Box from "@mui/material/Box";
import Button from "novel-ui/lib/buttons/Button";
import { useState } from "react";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CharacterOnScreenForm from "./CharacterOfScreenForm";
import { useLocalizedYup } from "common/yup";
import { useTranslation } from "react-i18next";

export interface DialogFormProps {
  onSubmit: (values: Dialog) => void;
  initialValues: Dialog;
  applyTextsForPreview: (values: Dialog) => void;
}

const DialogForm = ({
  onSubmit,
  initialValues,
  applyTextsForPreview,
}: DialogFormProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const yup = useLocalizedYup();
  const { t } = useTranslation();
  const handleSubmit = (values: Dialog) => {
    onSubmit(values);
    setIsFormOpen(false);
  };

  const validationSchema = yup.object({
    characterSayingText: yup.string().required(),
    text: yup.string().required(),
    charactersOnScreen: yup
      .array()
      .of(
        yup.object({
          leftPosition: yup.number().min(1).max(100).required(),
          name: yup.string().required(),
          zIndex: yup.number().min(0).max(100).required(),
          imgUrl: yup.string().required(),
        })
      )
      .required(),
  });

  return (
    <Box>
      {isFormOpen && (
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ submitForm, values }) => (
            <Box>
              <Box mb={2}>
                <TextFieldFormik
                  name="characterSayingText"
                  type="text"
                  id="characterSayingText"
                  label="characterSayingText"
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextFieldFormik
                  name="text"
                  type="text"
                  id="title"
                  label="text"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box
                mb={2}
                borderRadius={1}
                border="1px solid rgba(0,0,0,0.2)"
                p={2}
              >
                <Typography variant="overline">
                  {t("actsPages.add.dialogForm.title")}
                </Typography>

                <FieldArray
                  name="charactersOnScreen"
                  render={(props) => (
                    <CharacterOnScreenForm
                      values={values}
                      {...props}
                      applyTextsForPreview={applyTextsForPreview}
                    />
                  )}
                />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Tooltip
                    title={
                      t("actsPages.add.dialogForm.PreviewTooltip") as string
                    }
                  >
                    <IconButton
                      edge="start"
                      onClick={() => applyTextsForPreview(values)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box display="flex">
                  <Button
                    onClick={() => setIsFormOpen(false)}
                    color="error"
                    type="button"
                  >
                    {t("buttons.cancel")}
                  </Button>
                  <Box ml={2}>
                    <Button variant="contained" onClick={() => submitForm()}>
                      {t("actsPages.add.dialogForm.addDialogBtn")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Formik>
      )}
      {!isFormOpen && (
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={() => setIsFormOpen(true)}>
            {t("actsPages.add.dialogForm.addNewDialogBtn")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DialogForm;
