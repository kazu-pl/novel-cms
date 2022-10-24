import { useRef } from "react";
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
import { RequestScenery, SuccessfulReqMsg } from "types/novel-server.types";
import NotFoundWrapper from "common/wrappers/NotFoundWrapper";
import Markdown from "components/Markdown";
import NovelUIModal from "novel-ui/lib/modals/Modal";
import Button from "novel-ui/lib/buttons/Button";

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

  // initial values for form rendered inside of modal. It's needed to update the initial values after ctrl + v was clicked and user closed the modal. Right before closing  the modal you override the initialValues so the next time is open, you will see the previously pasted data even thou it was not updated yet
  const [initialValues, setInitialValues] = useState<RequestScenery>({
    title: singleScenery.data?.title || "",
    description: singleScenery.data?.description || "",
  });

  // this is just to update the initial data after fetching data of concrete character from API
  useEffect(() => {
    setInitialValues((prev) => ({
      ...prev,
      title: singleScenery.data?.title || "",
      description: singleScenery.data?.description || "",
    }));
  }, [singleScenery.data]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const descriptionTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOpenEditingModalOnCTRL_V = useCallback((e: KeyboardEvent) => {
    // detects when CTRL + V was clicked. It won't work on MAC because CTRL does not exist there (it has `command` btn instead)
    if (e.key === "v" && e.ctrlKey) {
      setIsUpdateModalOpen(true);
      setInitialValues((prev) => ({ ...prev, description: "" })); // reset the initial description (otherwise when you paste text it will be pasted BEFORE the previous text and the previous text will be still there but that's not what we want, we want to paste the copied text and nothing more, no previous text)
      descriptionTextAreaRef && descriptionTextAreaRef.current?.focus(); // focus textArea so the text will be pasted into the textArea
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleOpenEditingModalOnCTRL_V);

    return () => {
      window.removeEventListener("keydown", handleOpenEditingModalOnCTRL_V);
    };
  }, [handleOpenEditingModalOnCTRL_V]);

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

          <Box maxWidth={700} width="100%" mb={2}>
            <Typography variant="h6">{t("title")}:</Typography>
            <Typography>{singleScenery.data?.title}</Typography>
          </Box>

          <Box maxWidth={1000} width="100%" mb={2}>
            <Typography variant="h6">{t("description")}:</Typography>
            <Markdown>{singleScenery.data?.description}</Markdown>
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
                  descriptionTextAreaRef.current?.textContent ||
                  prev.description, // set the current textContent from textArea as new initial value for description key so when you open the modal again via button it will show the previously pasted text, and not empty field (empty because you set to to empty string riht before you focus it just to be able to paste something there without seeing the previous content)
              }));
            }}
            maxWidthOnDesktop={1000}
            widthOnDesktop="100%"
          >
            <BasicDataForm
              maxWidth="100%"
              onSubmitSideEffect={() => {
                setIsUpdateModalOpen(false); // just close the modal when update was successful
              }}
              onCancelBtnClick={(values) => {
                setInitialValues(values); // values are values obtained from Formnik via destructurizing them from children prop used as a function. It's:
                // <Formik>
                //   {({ isSubmitting, values }) => (
                //     <Button
                //       variant="text"
                //       color="error"
                //       onClick={(e) => {
                //         onCancelBtnClick(values);
                //       }}
                //     >
                //       {t("buttons.cancel")}
                //     </Button>
                //   )}
                // </Formik>;
                // you have to override initial values here so when the modal is open and you click `cancel` button and open  the modal again, it will have the previously pasted value, not the real one
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
