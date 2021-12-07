import { Dialog, Scene } from "types/novel-server.types";
import Box from "@mui/material/Box";
import Button from "novel-ui/lib/buttons/Button";
import { Formik, FieldArray } from "formik";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import {
  selectSceneriesDictionary,
  fetchSceneriesDictionary,
  fetchSingleScenery,
  selectSingleScenery,
  resetSingleSceneryData,
  resetSceneryDictionaryData,
} from "features/scenery/store/scenerySlice";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import { TextFieldProps } from "novel-ui/lib/inputs/TextField";
import { API_URL } from "common/constants/env";
import DialogForm, { createDialogValidationSchema } from "../Dialog/DialogForm";
import { useState } from "react";
import PreviewBox from "../PreviewBox";
import { useLocalizedYup, Yup } from "common/yup";
import DialogListItem from "../Dialog/DialogListItem";
import {
  StyledWrapper,
  StyledControlsWrapper,
  StyledPreviewBoxWrapper,
  StyledDialogsCounter,
} from "./NewSceneForm.styled";
import ActionModal from "components/ActionModal";

export const createSceneValidationSchema = (yup: Yup) =>
  yup.object({
    bgImg: yup.object({
      sceneryId: yup.string().required(),
      link: yup.string().required(),
    }),
    title: yup.string().required(),
    dialogs: yup.array().of(createDialogValidationSchema(yup)),
  });

type DialogOptions =
  | { isEditMode: false; dialogIndex: null }
  | {
      isEditMode: true;
      dialogIndex: number;
    };

interface ActToRemoveModalData {
  isOpen: boolean;
  dialogIndex: null | number;
  remove: (index: number) => void;
  dialog: {
    speaker: string;
    text: string;
  };
}

export interface NewActFormProps {
  btnLabel: string;
  onSubmit: (sceneItem: Scene) => void;
  hideForm: () => void;
  initialValues: Scene;
  isInSceneEditMode?: boolean;
}

const NewSceneForm = ({
  onSubmit,
  btnLabel,
  hideForm,
  initialValues,
  isInSceneEditMode,
}: NewActFormProps) => {
  const { t } = useTranslation();
  const yup = useLocalizedYup();

  const validationSchema = createSceneValidationSchema(yup);

  const dispatch = useAppDispatch();
  const sceneriesDictionary = useAppSelector(selectSceneriesDictionary);
  const singleScenery = useAppSelector(selectSingleScenery);

  useEffect(() => {
    dispatch(fetchSceneriesDictionary());
  }, [dispatch]);

  useEffect(() => {
    if (!!initialValues.bgImg.sceneryId) {
      dispatch(fetchSingleScenery(initialValues.bgImg.sceneryId));
    }
  }, [dispatch, initialValues.bgImg.sceneryId]);

  const fetchSingleSceneryImages: TextFieldProps["onChange"] = (e) => {
    dispatch(fetchSingleScenery(e.target.value));
  };

  const handleCloseForm = () => {
    dispatch(resetSingleSceneryData());
    dispatch(resetSceneryDictionaryData());
    hideForm();
  };

  const handleSubmit = (values: Scene) => {
    onSubmit(values);
    handleCloseForm();
  };

  const [dialogPreviewData, setDialogPreviewData] = useState<Dialog>({
    text: "",
    characterSayingText: "",
    charactersOnScreen: [],
  });

  const [initialDialogFormData, setInitialDialogFormData] = useState<Dialog>({
    text: "",
    characterSayingText: "",
    charactersOnScreen: [],
  });

  const [dialogOptions, setDialogOptions] = useState<DialogOptions>({
    isEditMode: false,
    dialogIndex: null,
  });

  const [isDialogFormOpen, setIsDialogFormOpen] = useState(false);

  const handleCloseDialogForm = () => {
    setIsDialogFormOpen(false);
    setDialogOptions({
      isEditMode: false,
      dialogIndex: null,
    });
  };

  const [prevDialogIndex, setprevDialogIndex] = useState<number | null>(null);
  const [actToRemoveModalData, setActToRemoveModalData] =
    useState<ActToRemoveModalData>({
      isOpen: false,
      dialogIndex: null,
      remove: () => {},
      dialog: {
        speaker: "",
        text: "",
      },
    });
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ submitForm, values, setFieldValue }) => (
          <>
            <Box
              display="flex"
              flexDirection="column"
              p={2}
              boxShadow={1}
              mt={2}
            >
              <StyledWrapper>
                <StyledControlsWrapper>
                  <Box>
                    {isInSceneEditMode && (
                      <Typography>
                        {t("actsPages.add.scenePart.form.editSceneTitle")}:{" "}
                        <span style={{ fontWeight: 500 }}>
                          {initialValues.title}
                        </span>
                      </Typography>
                    )}

                    {!isInSceneEditMode && (
                      <Typography>
                        {t("actsPages.add.scenePart.form.title")}
                      </Typography>
                    )}

                    <Box mt={2}>
                      <TextFieldFormik
                        name="title"
                        type="text"
                        id="title"
                        label={t("form.enterTitle")}
                        fullWidth
                      />
                    </Box>
                    <Box display="flex">
                      <Box mt={2} width="50%" mr={1}>
                        {sceneriesDictionary.isFetching && <CircularProgress />}
                        {!sceneriesDictionary.isFetching &&
                          !!sceneriesDictionary.data && (
                            <TextFieldFormik
                              name="bgImg.sceneryId"
                              select
                              clearable
                              id="bgImg.sceneryId"
                              fullWidth
                              label={t(
                                "actsPages.add.scenePart.form.selectSceneryId"
                              )}
                              onChange={(e) => {
                                fetchSingleSceneryImages(e);
                                setFieldValue("bgImg.link", "");
                              }}
                            >
                              {sceneriesDictionary.data.map((item, index) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.title}
                                </MenuItem>
                              ))}
                            </TextFieldFormik>
                          )}
                      </Box>
                      <Box mt={2} width="50%" ml={1}>
                        {singleScenery.isFetching && <CircularProgress />}
                        {!singleScenery.isFetching && !!singleScenery.data && (
                          <TextFieldFormik
                            name="bgImg.link"
                            select
                            clearable
                            id="bgImg.link"
                            fullWidth
                            label={t(
                              "actsPages.add.scenePart.form.selectSceneryBg"
                            )}
                          >
                            {singleScenery.data.imagesList.map(
                              (item, index) => (
                                <MenuItem key={item._id} value={item.url}>
                                  {item.filename}
                                </MenuItem>
                              )
                            )}
                          </TextFieldFormik>
                        )}
                      </Box>
                    </Box>
                    <Box
                      borderRadius={1}
                      border="1px solid rgba(0,0,0,0.2)"
                      p={2}
                      pt={1}
                      mt={2}
                    >
                      <Box mb={2}>
                        <Typography variant="overline">
                          {" "}
                          {t("actsPages.add.dialogForm.title")}
                        </Typography>
                      </Box>

                      <FieldArray
                        name="dialogs"
                        render={(props) => (
                          <>
                            {isDialogFormOpen && (
                              <DialogForm
                                {...props}
                                onCancelIconClick={() =>
                                  setprevDialogIndex(null)
                                }
                                isEditMode={dialogOptions.isEditMode}
                                onSubmit={(values) => {
                                  dialogOptions.isEditMode
                                    ? props.replace(
                                        dialogOptions.dialogIndex,
                                        values
                                      )
                                    : props.push(values);
                                }}
                                getPrevDialogData={() => {
                                  if (prevDialogIndex !== null) {
                                    return prevDialogIndex > 0
                                      ? values.dialogs[prevDialogIndex - 1]
                                      : null;
                                  } else {
                                    return values.dialogs.length > 0
                                      ? values.dialogs[
                                          values.dialogs.length - 1
                                        ]
                                      : null;
                                  }
                                }}
                                applyTextsForPreview={setDialogPreviewData}
                                initialValues={initialDialogFormData}
                                closeForm={handleCloseDialogForm}
                              />
                            )}
                            {!isDialogFormOpen && (
                              <Box display="flex" justifyContent="flex-end">
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    setInitialDialogFormData({
                                      text: "",
                                      characterSayingText: "",
                                      charactersOnScreen: [],
                                    });
                                    setDialogOptions({
                                      isEditMode: false,
                                      dialogIndex: null,
                                    });
                                    setIsDialogFormOpen(true);
                                  }}
                                >
                                  {t(
                                    "actsPages.add.dialogForm.addNewDialogBtn"
                                  )}
                                </Button>
                              </Box>
                            )}
                          </>
                        )}
                      />
                    </Box>
                  </Box>
                </StyledControlsWrapper>
                <StyledPreviewBoxWrapper>
                  {values.bgImg && values.bgImg.link && (
                    <PreviewBox
                      bgImgUrl={API_URL + values.bgImg.link}
                      {...dialogPreviewData}
                    />
                  )}
                  <Box mt={2}>
                    <Typography variant="overline">
                      {t("actsPages.add.dialogForm.dialogsInScene.title")}:{" "}
                      <StyledDialogsCounter>
                        {values.dialogs.length}
                      </StyledDialogsCounter>
                    </Typography>
                    <FieldArray
                      name="dialogs"
                      render={({ remove }) => (
                        <Box maxHeight={300} overflow="auto" p={1}>
                          {values.dialogs.map((dialog, dialogIndex) => (
                            <DialogListItem
                              index={dialogIndex}
                              dialog={dialog}
                              onSeePreviewIconClick={() =>
                                setDialogPreviewData(dialog)
                              }
                              onEditIconClick={() => {
                                setprevDialogIndex(dialogIndex);
                                setInitialDialogFormData(dialog);
                                setIsDialogFormOpen(true);
                                setDialogOptions({
                                  isEditMode: true,
                                  dialogIndex,
                                });
                              }}
                              onDeleteIconClick={() => {
                                setActToRemoveModalData({
                                  isOpen: true,
                                  dialogIndex,
                                  remove,
                                  dialog: {
                                    speaker: dialog.characterSayingText || "",
                                    text: dialog.text,
                                  },
                                });
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    />
                  </Box>
                </StyledPreviewBoxWrapper>
              </StyledWrapper>

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  onClick={() => handleCloseForm()}
                  color="error"
                  type="button"
                >
                  {t("buttons.cancel")}
                </Button>
                <Box ml={2}>
                  <Button variant="contained" onClick={() => submitForm()}>
                    {btnLabel}
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Formik>
      <ActionModal
        headlineText={t("actsPages.add.dialogForm.modal.title")}
        open={actToRemoveModalData.isOpen}
        onClose={() =>
          setActToRemoveModalData((prev) => ({
            ...prev,
            isOpen: false,
            dialogIndex: null,
            dialog: {
              speaker: "",
              text: "",
            },
          }))
        }
        onActionBtnClick={() => {
          actToRemoveModalData.dialogIndex !== null &&
            actToRemoveModalData.remove(actToRemoveModalData.dialogIndex);
          setActToRemoveModalData((prev) => ({
            ...prev,
            isOpen: false,
            dialogIndex: null,
            dialog: {
              speaker: "",
              text: "",
            },
          }));
        }}
        preChildrenTitle={{
          preTitle: `${t(
            "actsPages.add.dialogForm.modal.speaker"
          )}: ` as string,
          title: actToRemoveModalData.dialog.speaker,
        }}
      >
        <>
          {`${t("actsPages.add.dialogForm.modal.text")}: ${
            actToRemoveModalData.dialog.text
          }`}
          <Box mt={1}>
            <Typography>{t("actsPages.add.dialogForm.modal.info")}</Typography>
          </Box>
        </>
      </ActionModal>
    </>
  );
};

export default NewSceneForm;
