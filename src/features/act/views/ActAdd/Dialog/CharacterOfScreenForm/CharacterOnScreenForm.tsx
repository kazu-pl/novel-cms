import Box from "@mui/system/Box";
import { FieldArrayRenderProps } from "formik";
import Button from "novel-ui/lib/buttons/Button";
import { Dialog, CharacterOnScreen } from "types/novel-server.types";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import {
  fetchCharactersDictionary,
  fetchSingleCharacter,
  selectCharactersDictionary,
  selectSingleCharacter,
} from "features/character/store/characterSlice";
import MenuItem from "@mui/material/MenuItem";
import TextField, { TextFieldProps } from "novel-ui/lib/inputs/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocalizedYup } from "common/yup";
import FormHelperText from "@mui/material/FormHelperText";
import { IconButton, Tooltip, Typography } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import replaceAt from "./replaceAt";
import { useTranslation } from "react-i18next";

export type EditModeOptions =
  | { isEditMode: false; indexOfCharacterToEdit: null }
  | { isEditMode: true; indexOfCharacterToEdit: number };

export interface CharacterOnScreenFormProps extends FieldArrayRenderProps {
  values: Dialog;
  applyTextsForPreview: (values: Dialog) => void;
}

const CharacterOnScreenForm = ({
  applyTextsForPreview,
  name,
  push,
  form,
  values,
  remove,
  replace,
}: CharacterOnScreenFormProps) => {
  const dispatch = useAppDispatch();
  const charactersDictionary = useAppSelector(selectCharactersDictionary);
  const singleCharacter = useAppSelector(selectSingleCharacter);
  const yup = useLocalizedYup();

  const { t } = useTranslation();

  const validationSchema = yup.object({
    leftPosition: yup.number().min(1).max(100).required(),
    name: yup.string().required(),
    zIndex: yup.number().min(0).max(100).required(),
    imgUrl: yup.string().required(),
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<CharacterOnScreen>({
    leftPosition: 50,
    name: "",
    zIndex: 1,
    imgUrl: "",
  });
  const [editModeOptions, setEditModeOptions] = useState<EditModeOptions>({
    isEditMode: false,
    indexOfCharacterToEdit: null,
  });

  const handleSubmit = (values: CharacterOnScreen) => {
    if (editModeOptions.isEditMode) {
      replace(editModeOptions.indexOfCharacterToEdit, values);
    } else {
      push(values);
    }

    setInitialValues({
      leftPosition: 50,
      name: "",
      zIndex: 1,
      imgUrl: "",
    });

    setIsFormVisible(false);
    setEditModeOptions({ isEditMode: false, indexOfCharacterToEdit: null });
  };

  useEffect(() => {
    dispatch(fetchCharactersDictionary());
  }, [dispatch]);

  const fetchSingleCharacerImages: TextFieldProps["onChange"] = (e) => {
    dispatch(fetchSingleCharacter(e.target.value));
  };

  return (
    <>
      {values.charactersOnScreen.map((character, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
          boxShadow={1}
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <Typography>
              {t("actsPages.add.charactersOnScreen.list.character")}:{" "}
              <span style={{ fontWeight: 500 }}>{character.name}</span>
            </Typography>
            <Box ml={2} mr={2}>
              <Typography>zIndex: {character.zIndex}</Typography>
            </Box>
            <Typography>left: {character.leftPosition}%</Typography>
          </Box>
          <Box display="flex">
            <IconButton
              onClick={() => {
                setIsFormVisible(true);
                setInitialValues(character);
                setEditModeOptions({
                  isEditMode: true,
                  indexOfCharacterToEdit: index,
                });
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                remove(index);
                applyTextsForPreview({
                  ...values,
                  charactersOnScreen: values.charactersOnScreen.filter(
                    (_, characterIndex) => characterIndex !== index
                  ),
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      {isFormVisible && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({
            submitForm,
            setFieldValue,
            touched,
            errors,
            values: characterValues,
          }) => (
            <div>
              <Box mt={2} display="flex">
                <Box mt={2} width="50%" mr={1}>
                  {charactersDictionary.isFetching && <CircularProgress />}
                  {!charactersDictionary.isFetching &&
                    !!charactersDictionary.data && (
                      <>
                        <TextField
                          name="name"
                          select
                          clearable
                          id="name"
                          fullWidth
                          label="name"
                          onChange={(e) => {
                            fetchSingleCharacerImages(e);
                            setFieldValue(
                              "name",
                              e.target.value === ""
                                ? ""
                                : charactersDictionary.data?.filter(
                                    (item) => item.id === e.target.value
                                  )[0].title
                            );
                          }}
                        >
                          {charactersDictionary.data.map((item, index) => (
                            <MenuItem key={item.id || index} value={item.id}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </TextField>
                        {(touched.name || !!errors.name) && (
                          <FormHelperText
                            sx={{ color: (theme) => theme.palette.error.main }}
                          >
                            {errors.name}
                          </FormHelperText>
                        )}
                      </>
                    )}
                </Box>
                <Box mt={2} width="50%" ml={1}>
                  {singleCharacter.isFetching && <CircularProgress />}
                  {!singleCharacter.isFetching && !!singleCharacter.data && (
                    <TextFieldFormik
                      name="imgUrl"
                      select
                      clearable
                      id="imgUrl"
                      fullWidth
                      label="imgUrl"
                    >
                      {singleCharacter.data.imagesList.map((item, index) => (
                        <MenuItem key={item._id || index} value={item.url}>
                          {item.filename}
                        </MenuItem>
                      ))}
                    </TextFieldFormik>
                  )}
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Box mt={2} width="50%" mr={1}>
                  <TextFieldFormik
                    name="leftPosition"
                    type="number"
                    id="leftPosition"
                    label="left"
                    fullWidth
                  />
                </Box>
                <Box mt={2} width="50%" ml={1}>
                  <TextFieldFormik
                    name="zIndex"
                    type="number"
                    id="zIndex"
                    label="zIndex"
                    fullWidth
                  />
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Box>
                  <Tooltip
                    title={
                      t(
                        "actsPages.add.charactersOnScreen.form.PreviewTooltip"
                      ) as string
                    }
                  >
                    <IconButton
                      edge="start"
                      onClick={() => {
                        editModeOptions.isEditMode
                          ? applyTextsForPreview({
                              ...values,
                              charactersOnScreen: replaceAt(
                                values.charactersOnScreen,
                                editModeOptions.indexOfCharacterToEdit,
                                characterValues
                              ),
                            })
                          : applyTextsForPreview({
                              ...values,
                              charactersOnScreen:
                                values.charactersOnScreen.concat(
                                  characterValues
                                ),
                            });
                      }}
                    >
                      <PreviewIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box display="flex">
                  <Button
                    onClick={() => {
                      setIsFormVisible(false);
                      applyTextsForPreview(values);
                      setEditModeOptions({
                        isEditMode: false,
                        indexOfCharacterToEdit: null,
                      });
                      setInitialValues({
                        leftPosition: 50,
                        name: "",
                        zIndex: 1,
                        imgUrl: "",
                      });
                    }}
                    color="error"
                  >
                    {t("buttons.cancel")}
                  </Button>
                  <Button
                    onClick={() => {
                      !editModeOptions.isEditMode &&
                        applyTextsForPreview({
                          ...values,
                          charactersOnScreen:
                            values.charactersOnScreen.concat(characterValues),
                        });

                      editModeOptions.isEditMode &&
                        applyTextsForPreview({
                          ...values,
                          charactersOnScreen: replaceAt(
                            values.charactersOnScreen,
                            editModeOptions.indexOfCharacterToEdit,
                            characterValues
                          ),
                        });
                      submitForm();
                    }}
                    variant="contained"
                  >
                    {editModeOptions.isEditMode
                      ? t("actsPages.add.charactersOnScreen.form.editCharBtn")
                      : t("actsPages.add.charactersOnScreen.form.addCharBtn")}
                  </Button>
                </Box>
              </Box>
            </div>
          )}
        </Formik>
      )}

      {!isFormVisible && (
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={() => setIsFormVisible(true)} variant="contained">
            {t("actsPages.add.charactersOnScreen.form.addNewCharBtn")}
          </Button>
        </Box>
      )}
    </>
  );
};

export default CharacterOnScreenForm;
