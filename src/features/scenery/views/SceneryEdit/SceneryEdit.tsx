import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import Box from "@mui/material/Box";
import { useAppDispatch } from "common/store/hooks";
import {
  fetchSingleScenery,
  resetSingleSceneryData,
} from "features/scenery/store/scenerySlice";
import { useParams } from "react-router-dom";
import { useEffect, useCallback } from "react";

import NewSceneryImagesForm from "./NewSceneryImagesForm";
import Typography from "@mui/material/Typography";
import ImagesGallery from "./ImagesGallery";
import BasicDataForm from "./BasicDataForm";

const SceneryAdd = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const fetchScenery = useCallback(async () => {
    try {
      await dispatch(fetchSingleScenery(id));
    } catch (error) {}
  }, [dispatch, id]);

  useEffect(() => {
    fetchScenery();
  }, [fetchScenery]);

  useEffect(() => {
    return () => {
      dispatch(resetSingleSceneryData());
    };
  }, [dispatch]);

  return (
    <>
      <HelmetDecorator
        title={t("SceneryPages.edit.metaData.title")}
        description={t("SceneryPages.edit.metaData.description")}
        imageAlt={t("SceneryPages.edit.metaData.imageAlt")}
      />
      <DashboardLayoutWrapper title={t("SceneryPages.edit.title")}>
        <Box mb={2}>
          <Typography>{t("SceneryPages.edit.basicDataFormTitle")}</Typography>
        </Box>
        <BasicDataForm />
        <Box maxWidth={700} width="100%">
          <Box mb={2}>
            <Typography>{t("SceneryPages.edit.newImagesTitle")}</Typography>
          </Box>
          <NewSceneryImagesForm />
        </Box>
        <Box maxWidth={700} width="100%">
          <Box mb={2}>
            <Typography>{t("SceneryPages.edit.imagesGalleryTitle")}</Typography>
          </Box>
          <ImagesGallery />
        </Box>
      </DashboardLayoutWrapper>
    </>
  );
};

export default SceneryAdd;
