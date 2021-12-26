import { Dialog } from "types/novel-server.types";
import { Formik, FieldArray } from "formik";
import Box from "@mui/material/Box";
import Button from "novel-ui/lib/buttons/Button";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CharacterOnScreenForm, {
  createCharacterOnScreenSchema,
} from "./CharacterOfScreenForm";
import { useLocalizedYup, Yup } from "common/yup";
import { useTranslation } from "react-i18next";
import { selectCharactersDictionary } from "features/character/store/characterSlice";
import { useAppSelector } from "common/store/hooks";
import { CircularProgress, MenuItem } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export const createDialogValidationSchema = (yup: Yup) =>
  yup.object({
    characterSayingText: yup.string(),
    text: yup.string().required(),
    charactersOnScreen: yup
      .array()
      .of(createCharacterOnScreenSchema(yup))
      .required(),
  });

export interface DialogFormProps {
  onSubmit: (values: Dialog) => void;
  initialValues: Dialog;
  closeForm: () => void;
  applyTextsForPreview: (values: Dialog) => void;
  isEditMode: boolean;
  getPrevDialogData: () => Dialog | null;
  onCancelIconClick?: () => void;
}

const DialogForm = ({
  onSubmit,
  initialValues,
  closeForm,
  applyTextsForPreview,
  isEditMode,
  onCancelIconClick,
  getPrevDialogData,
}: DialogFormProps) => {
  const yup = useLocalizedYup();
  const { t } = useTranslation();
  const charactersDictionary = useAppSelector(selectCharactersDictionary);

  const handleSubmit = (values: Dialog) => {
    onSubmit(values);
    closeForm();
  };

  const validationSchema = createDialogValidationSchema(yup);

  return (
    <Box>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ submitForm, values, setFieldValue }) => (
          <Box>
            <Box mb={2}>
              {charactersDictionary.isFetching && <CircularProgress />}
              {!charactersDictionary.isFetching && !!charactersDictionary.data && (
                <>
                  <TextFieldFormik
                    name="characterSayingText"
                    select
                    clearable
                    id="characterSayingText"
                    fullWidth
                    label={t("actsPages.add.dialogForm.characterSayingText")}
                  >
                    {charactersDictionary.data.map((item) => (
                      <MenuItem key={item.id} value={item.title}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </TextFieldFormik>
                </>
              )}
            </Box>
            <Box mb={2}>
              <TextFieldFormik
                name="text"
                type="text"
                id="title"
                label={t("actsPages.add.dialogForm.text")}
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
                {t("actsPages.add.dialogForm.characterFormTitle")}
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
                  title={t("actsPages.add.dialogForm.PreviewTooltip") as string}
                >
                  <IconButton
                    edge="start"
                    onClick={() => applyTextsForPreview(values)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    t(
                      "actsPages.add.charactersOnScreen.form.copyFromPrev"
                    ) as string
                  }
                >
                  <IconButton
                    onClick={() => {
                      const prevDialog = getPrevDialogData();
                      if (prevDialog !== null) {
                        setFieldValue(
                          "charactersOnScreen",
                          prevDialog.charactersOnScreen
                        );
                      }
                    }}
                  >
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    t("actsPages.add.dialogForm.putInQuoteTooltip") as string
                  }
                >
                  <IconButton
                    onClick={() => {
                      setFieldValue("text", `"${values.text}"`);
                      applyTextsForPreview({
                        ...values,
                        text: `"${values.text}"`,
                      });
                    }}
                  >
                    <FormatQuoteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box display="flex">
                <Button
                  onClick={() => {
                    closeForm();
                    onCancelIconClick && onCancelIconClick();
                  }}
                  color="error"
                  type="button"
                >
                  {t("buttons.cancel")}
                </Button>
                <Box ml={2}>
                  <Button variant="contained" onClick={() => submitForm()}>
                    {isEditMode
                      ? t("actsPages.add.dialogForm.editDialogBtn")
                      : t("actsPages.add.dialogForm.addDialogBtn")}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default DialogForm;
