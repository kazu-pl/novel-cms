import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import {
  fetchSingleCharacter,
  resetSingleCharacterData,
  deleteCharacterImage,
  selectSingleCharacter,
} from "features/character/store/characterSlice";
import { useParams } from "react-router-dom";
import { useEffect, useCallback, useState, useRef } from "react";
import NovelUIModal from "novel-ui/lib/modals/Modal";
import NewCharacterImagesForm from "./NewCharacterImagesForm";
import Typography from "@mui/material/Typography";
import ImagesGallery from "./ImagesGallery";
import BasicDataForm from "./BasicDataForm";
import { RequestCharacter, SuccessfulReqMsg } from "types/novel-server.types";
import { useSnackbar } from "notistack";
import NotFoundWrapper from "common/wrappers/NotFoundWrapper";
import Markdown from "components/Markdown/Markdown";
import ActionModal from "components/ActionModal";
import Button from "novel-ui/lib/buttons/Button";

const CharacterEdit = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;
  const { enqueueSnackbar } = useSnackbar();
  const character = useAppSelector(selectSingleCharacter);

  const [imageToRemoveModalData, setImageToRemoveModalData] = useState({
    isOpen: false,
    filename: "",
  });

  // initial values for form rendered inside of modal. It's needed to update the initial values after ctrl + v was clicked and user closed the modal. Right before closing  the modal you override the initialValues so the next time is open, you will see the previously pasted data even thou it was not updated yet
  const [initialValues, setInitialValues] = useState<RequestCharacter>({
    title: character.data?.title || "",
    description: character.data?.description || "",
  });

  // this is just to update the initial data after fetching data of concrete character from API
  useEffect(() => {
    setInitialValues((prev) => ({
      ...prev,
      title: character.data?.title || "",
      description: character.data?.description || "",
    }));
  }, [character.data]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const descriptionTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOpenEditingModalOnCTRL_V = useCallback((e: KeyboardEvent) => {
    // detects when CTRL + V was clicked. It won't work on MAC because CTRL does not exist there (it has `command` btn instead)
    if (e.key === "v" && e.ctrlKey) {
      setIsUpdateModalOpen(true);
      setInitialValues((prev) => ({ ...prev, description: "" })); // reset the initial description (otherwise when you paste text it will be pasted BEFORE the previous)
      descriptionTextAreaRef && descriptionTextAreaRef.current?.focus(); // focus textArea so the text will be pasted into the textArea
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleOpenEditingModalOnCTRL_V);

    return () => {
      window.removeEventListener("keydown", handleOpenEditingModalOnCTRL_V);
    };
  }, [handleOpenEditingModalOnCTRL_V]);

  const fetchCharacter = useCallback(async () => {
    try {
      await dispatch(fetchSingleCharacter(id));
    } catch (error) {}
  }, [dispatch, id]);

  useEffect(() => {
    fetchCharacter();
  }, [fetchCharacter]);

  useEffect(() => {
    return () => {
      dispatch(resetSingleCharacterData());
    };
  }, [dispatch]);

  const handleImageDelete = async (filename: string) => {
    try {
      const response = await dispatch(
        deleteCharacterImage({ imageFilename: filename, characterId: id })
      );
      const payload = response.payload as SuccessfulReqMsg;
      setImageToRemoveModalData({
        isOpen: false,
        filename: "",
      });
      enqueueSnackbar(payload.message, {
        variant: "info",
      });

      dispatch(fetchSingleCharacter(id));
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
      });
    }
  };

  const onDeleteIconClick = (filename: string) => {
    setImageToRemoveModalData({
      filename,
      isOpen: true,
    });
  };

  return (
    <>
      <HelmetDecorator
        title={t("CharacterPages.edit.metaData.title")}
        description={t("CharacterPages.edit.metaData.description")}
        imageAlt={t("CharacterPages.edit.metaData.imageAlt")}
      />
      <DashboardLayoutWrapper title={t("CharacterPages.edit.title")}>
        <NotFoundWrapper
          isLoadingData={character.isFetching}
          isNotFound={!character.data}
        >
          <Box mb={2}>
            <Typography>
              {t("CharacterPages.edit.basicDataFormTitle")}
            </Typography>
          </Box>

          <Box maxWidth={700} width="100%" mb={2}>
            <Typography variant="h6">{t("title")}:</Typography>
            <Typography>{character.data?.title}</Typography>
          </Box>

          <Box maxWidth={1000} width="100%" mb={2}>
            <Typography variant="h6">{t("description")}:</Typography>
            <Markdown>{character.data?.description}</Markdown>
          </Box>

          <NovelUIModal
            headlineText={t("buttons.update")}
            open={isUpdateModalOpen}
            onClose={() => {
              setIsUpdateModalOpen(false);
              // below setInitialValues is needed to update description value after user presed ctrl + v and clicked outside the form to close the modal. onClose will save the pasted value as new initialValue so when user opens modal again via edit btn they will see the previously pasted value, not an empty string or the original data
              setInitialValues((prev) => ({
                ...prev,
                description:
                  descriptionTextAreaRef.current?.textContent || // save current textContent of textArea input. TextArea was focued right after opening modal which means it has pasted data from clipboard so we can use it here and save as the new initial value so when user opens the modal again, they will see the previously pasted data
                  prev.description,
              }));
            }}
            maxWidthOnDesktop={1000}
            widthOnDesktop="100%"
          >
            <BasicDataForm
              maxWidth="100%"
              onSubmitSideEffect={() => {
                setIsUpdateModalOpen(false);
              }}
              onCancelBtnClick={(values) => {
                setInitialValues(values); // values are `values` key (formik form values) destructured from children prop of Formik used as a function
                setIsUpdateModalOpen(false);
              }}
              descriptionTextAreaRef={descriptionTextAreaRef}
              initialValues={initialValues}
            />
          </NovelUIModal>

          <Box
            maxWidth={700}
            width="100%"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Box mr={1}>
              <Typography variant="overline">
                {t("buttons.pasteBtnsCombination")}
              </Typography>
            </Box>
            <Button
              variant="contained"
              type="submit"
              onClick={() => setIsUpdateModalOpen(true)}
            >
              {t("buttons.edit")}
            </Button>
          </Box>

          <Box maxWidth={700} width="100%">
            <Box mb={2}>
              <Typography variant="h6">
                {t("CharacterPages.edit.newImagesTitle")}
              </Typography>
            </Box>
            <NewCharacterImagesForm />
          </Box>
          <Box maxWidth={700} width="100%">
            <Box mb={2}>
              <Typography variant="h6">
                {t("CharacterPages.edit.imagesGalleryTitle")}
              </Typography>
            </Box>
            <ImagesGallery onDeleteIconClick={onDeleteIconClick} />
          </Box>
          <ActionModal
            headlineText={t("CharacterPages.edit.modal.headlineText")}
            open={imageToRemoveModalData.isOpen}
            onClose={() =>
              setImageToRemoveModalData({ isOpen: false, filename: "" })
            }
            onActionBtnClickPromise={() =>
              handleImageDelete(imageToRemoveModalData.filename)
            }
            preChildrenTitle={{
              preTitle: t("CharacterPages.edit.modal.sceneryPretitle"),
              title: imageToRemoveModalData.filename,
            }}
          >
            {t("CharacterPages.edit.modal.text")}
          </ActionModal>
        </NotFoundWrapper>
      </DashboardLayoutWrapper>
    </>
  );
};

export default CharacterEdit;
