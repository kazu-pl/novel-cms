import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import {
  fetchSingleScenery,
  resetSingleSceneryData,
  deleteSceneryImage,
  selectSingleScenery,
} from "features/scenery/store/scenerySlice";
import { useParams } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import NewSceneryImagesForm from "./NewSceneryImagesForm";
import Typography from "@mui/material/Typography";
import ImagesGallery from "./ImagesGallery";
import BasicDataForm from "./BasicDataForm";
import ActionModal from "components/ActionModal";
import { SuccessfulReqMsg } from "types/novel-server.types";
import NotFoundWrapper from "common/wrappers/NotFoundWrapper";

const SceneryEdit = () => {
  const params = useParams();
  const id = params.id as string;
  const [imageToRemoveModalData, setImageToRemoveModalData] = useState({
    isOpen: false,
    filename: "",
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const singleScenery = useAppSelector(selectSingleScenery);
  const fetchScenery = useCallback(async () => {
    try {
      await dispatch(fetchSingleScenery(id));
    } catch (error) {
      if (error) {
        enqueueSnackbar(error as string, {
          variant: "error",
        });
      }
    }
  }, [dispatch, id, enqueueSnackbar]);

  useEffect(() => {
    fetchScenery();
  }, [fetchScenery]);

  useEffect(() => {
    return () => {
      dispatch(resetSingleSceneryData());
    };
  }, [dispatch]);

  const handleImageDelete = async (filename: string) => {
    try {
      const response = await dispatch(
        deleteSceneryImage({ imageFilename: filename, sceneryId: id })
      );
      const payload = response.payload as SuccessfulReqMsg;
      setImageToRemoveModalData({
        isOpen: false,
        filename: "",
      });
      enqueueSnackbar(payload.message, {
        variant: "info",
      });

      dispatch(fetchSingleScenery(id));
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
        title={t("SceneryPages.edit.metaData.title")}
        description={t("SceneryPages.edit.metaData.description")}
        imageAlt={t("SceneryPages.edit.metaData.imageAlt")}
      />
      <DashboardLayoutWrapper title={t("SceneryPages.edit.title")}>
        <NotFoundWrapper
          isLoadingData={singleScenery.isFetching}
          isNotFound={!singleScenery.data}
        >
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
              <Typography>
                {t("SceneryPages.edit.imagesGalleryTitle")}
              </Typography>
            </Box>
            <ImagesGallery onDeleteIconClick={onDeleteIconClick} />
          </Box>
          <ActionModal
            headlineText={t("SceneryPages.edit.modal.headlineText")}
            open={imageToRemoveModalData.isOpen}
            onClose={() =>
              setImageToRemoveModalData({ isOpen: false, filename: "" })
            }
            onActionBtnClickPromise={() =>
              handleImageDelete(imageToRemoveModalData.filename)
            }
            preChildrenTitle={{
              preTitle: t("SceneryPages.edit.modal.sceneryPretitle"),
              title: imageToRemoveModalData.filename,
            }}
          >
            {t("SceneryPages.edit.modal.text")}
          </ActionModal>
        </NotFoundWrapper>
      </DashboardLayoutWrapper>
    </>
  );
};

export default SceneryEdit;
