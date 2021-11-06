import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import Box from "@mui/material/Box";
import { useAppDispatch } from "common/store/hooks";
import {
  fetchSingleCharacter,
  resetSingleCharacterData,
} from "features/character/store/characterSlice";
import { useParams } from "react-router-dom";
import { useEffect, useCallback } from "react";

import NewCharacterImagesForm from "./NewCharacterImagesForm";
import Typography from "@mui/material/Typography";
import ImagesGallery from "./ImagesGallery";
import BasicDataForm from "./BasicDataForm";

const CharacterEdit = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

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

  return (
    <>
      <HelmetDecorator
        title={t("CharacterPages.edit.metaData.title")}
        description={t("CharacterPages.edit.metaData.description")}
        imageAlt={t("CharacterPages.edit.metaData.imageAlt")}
      />
      <DashboardLayoutWrapper title={t("CharacterPages.edit.title")}>
        <Box mb={2}>
          <Typography>{t("CharacterPages.edit.basicDataFormTitle")}</Typography>
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
          <ImagesGallery />
        </Box>
      </DashboardLayoutWrapper>
    </>
  );
};

export default CharacterEdit;
