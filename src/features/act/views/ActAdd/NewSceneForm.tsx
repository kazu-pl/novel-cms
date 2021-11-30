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
import TextField, { TextFieldProps } from "novel-ui/lib/inputs/TextField";
import { API_URL } from "common/constants/env";
import DialogForm from "./Dialog/DialogForm";
import { useState } from "react";
import PreviewBox from "./PreviewBox";

const NewSceneDialogs = (values: any) => {
  useEffect(() => {
    console.log({ newSceneValues: values });
  }, [values]);

  return null;
};

const initialValues: Scene = {
  title: "",
  bgImgUrl: "",
  dialogs: [],
};

export interface NewActFormProps {
  btnLabel: string;
  pushNewScene: (sceneItem: Scene) => void;
  hideForm: () => void;
}

const NewSceneForm = ({
  pushNewScene,
  btnLabel,
  hideForm,
}: NewActFormProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const sceneriesDictionary = useAppSelector(selectSceneriesDictionary);
  const singleScenery = useAppSelector(selectSingleScenery);

  useEffect(() => {
    dispatch(fetchSceneriesDictionary());
  }, [dispatch]);

  const fetchSingleSceneryImages: TextFieldProps["onChange"] = (e) => {
    dispatch(fetchSingleScenery(e.target.value));
  };

  const handleCloseForm = () => {
    dispatch(resetSingleSceneryData());
    dispatch(resetSceneryDictionaryData());
    hideForm();
  };

  const handleSubmit = (values: Scene) => {
    pushNewScene(values);
    handleCloseForm();
  };

  const [dialogPreviewData, setDialogPreviewData] = useState<Dialog>({
    text: "",
    characterSayingText: "",
    charactersOnScreen: [],
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      // validationSchema={validationSchema}
    >
      {({ submitForm, values }) => (
        <>
          <NewSceneDialogs {...values} />
          <Box p={2} boxShadow={1} mb={2} mt={2} display="flex">
            <Box width="50%" mr={1}>
              <Box>
                <Typography>Add new scene</Typography>
                <Box mt={2}>
                  <TextFieldFormik
                    name="title"
                    type="text"
                    id="title"
                    label={t("form.enterTitle")}
                    fullWidth
                  />
                </Box>
                <Box mt={2} display="flex">
                  <Box mt={2} width="50%" mr={1}>
                    {sceneriesDictionary.isFetching && <CircularProgress />}
                    {!sceneriesDictionary.isFetching &&
                      !!sceneriesDictionary.data && (
                        <TextField
                          name="scenery"
                          select
                          clearable
                          id="scenery"
                          fullWidth
                          label="scenery"
                          onChange={fetchSingleSceneryImages}
                        >
                          {sceneriesDictionary.data.map((item, index) => (
                            <MenuItem key={item.id || index} value={item.id}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                  </Box>
                  <Box mt={2} width="50%" ml={1}>
                    {singleScenery.isFetching && <CircularProgress />}
                    {!singleScenery.isFetching && !!singleScenery.data && (
                      <TextFieldFormik
                        name="bgImgUrl"
                        select
                        clearable
                        id="bgImgUrl"
                        fullWidth
                        label="bgImgUrl"
                      >
                        {singleScenery.data.imagesList.map((item, index) => (
                          <MenuItem key={item._id || index} value={item.url}>
                            {item.filename}
                          </MenuItem>
                        ))}
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
                    <Typography variant="overline">Dialogs</Typography>
                  </Box>

                  <FieldArray
                    name="dialogs"
                    render={(props) => (
                      <DialogForm
                        onSubmit={(values) => props.push(values)}
                        applyTextsForPreview={setDialogPreviewData}
                        initialValues={{
                          text: "",
                          characterSayingText: "",
                          charactersOnScreen: [],
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
            <Box width="50%" ml={1}>
              {values.bgImgUrl && (
                <PreviewBox
                  bgImgUrl={API_URL + values.bgImgUrl}
                  {...dialogPreviewData}
                />
              )}
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              onClick={() => handleCloseForm()}
              color="error"
              type="button"
            >
              cancel
            </Button>
            <Box ml={2}>
              <Button variant="contained" onClick={() => submitForm()}>
                {btnLabel}
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Formik>
  );
};

export default NewSceneForm;
