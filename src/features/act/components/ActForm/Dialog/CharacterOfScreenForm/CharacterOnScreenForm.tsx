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
import { TextFieldProps } from "novel-ui/lib/inputs/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocalizedYup, Yup } from "common/yup";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import replaceAt from "./replaceAt";
import { useTranslation } from "react-i18next";
import CharacterOnScreenListItem from "./CharacterOnScreenListItem";

export const createCharacterOnScreenSchema = (yup: Yup) =>
  yup.object({
    leftPosition: yup.number().min(1).max(100).required(),
    characterId: yup.string().required(),
    name: yup.string().required(),
    zIndex: yup.number().min(0).max(100).required(),
    imgUrl: yup.string().required(),
  });

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

  const validationSchema = createCharacterOnScreenSchema(yup);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<CharacterOnScreen>({
    leftPosition: 50,
    characterId: "",
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
      characterId: "",
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

  useEffect(() => {
    if (!!initialValues.characterId) {
      dispatch(fetchSingleCharacter(initialValues.characterId));
    }
  }, [dispatch, initialValues.characterId]);

  const fetchSingleCharacerImages: TextFieldProps["onChange"] = (e) => {
    dispatch(fetchSingleCharacter(e.target.value));
  };

  return (
    <>
      {values.charactersOnScreen.map((character, index) => (
        <CharacterOnScreenListItem
          index={index}
          character={character}
          onEditIconClick={() => {
            setIsFormVisible(true);
            setInitialValues(character);
            setEditModeOptions({
              isEditMode: true,
              indexOfCharacterToEdit: index,
            });
          }}
          onRemoveIconClick={() => {
            remove(index);
            applyTextsForPreview({
              ...values,
              charactersOnScreen: values.charactersOnScreen.filter(
                (_, characterIndex) => characterIndex !== index
              ),
            });
          }}
        />
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
                        <TextFieldFormik
                          name="characterId"
                          select
                          clearable
                          id="characterId"
                          fullWidth
                          label={t(
                            "actsPages.add.charactersOnScreen.form.characterName"
                          )}
                          onChange={(e) => {
                            fetchSingleCharacerImages(e);
                            setFieldValue("imgUrl", "");
                            if (!!charactersDictionary.data) {
                              if (e.target.value === "") {
                                setFieldValue("name", "");
                              } else {
                                setFieldValue(
                                  "name",
                                  charactersDictionary.data.find(
                                    (item) => item.id === e.target.value
                                  )?.title
                                );
                              }
                            }
                          }}
                        >
                          {charactersDictionary.data.map((item, index) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </TextFieldFormik>
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
                        <MenuItem key={item._id} value={item.url}>
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
                      <VisibilityIcon />
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
                        characterId: "",
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
