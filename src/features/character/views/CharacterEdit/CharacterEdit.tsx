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
import { useEffect, useCallback, useState } from "react";
import ActionModal from "components/ActionModal";
import NewCharacterImagesForm from "./NewCharacterImagesForm";
import Typography from "@mui/material/Typography";
import ImagesGallery from "./ImagesGallery";
import BasicDataForm from "./BasicDataForm";
import { SuccessfulReqMsg } from "types/novel-server.types";
import { useSnackbar } from "notistack";
import NotFoundWrapper from "common/wrappers/NotFoundWrapper";

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
          <BasicDataForm />
          <Box maxWidth={700} width="100%">
            <Box mb={2}>
              <Typography>{t("CharacterPages.edit.newImagesTitle")}</Typography>
            </Box>
            <NewCharacterImagesForm />
          </Box>
          <Box maxWidth={700} width="100%">
            <Box mb={2}>
              <Typography>
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
