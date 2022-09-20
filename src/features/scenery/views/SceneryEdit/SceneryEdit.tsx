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

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const descriptionTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const editableDivRef = useRef<HTMLDivElement | null>(null);

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

  const fetchScenery = useCallback(async () => {
    try {
      await dispatch(fetchSingleScenery(id));
      editableDivRef.current?.focus({ preventScroll: true }); // focus editableDiv after data was fetched to allow opening modal on paste event
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

  useEffect(() => {
    // auto focuses the editableDiv so it is focuesed already when you enter the page and you can use paste event to open modal
    editableDivRef.current?.focus({ preventScroll: true });
    // this does not really work right now because editableDiv is inside of NotFoundWrapper which will render it after the data is fetched (that's why the edditableDivRef is also focused after the data was successfuly downwloaded in fetchCharacter function)
  }, [editableDivRef]);

  const handlePasteEditableDiv = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault(); // prevents pasting text into the div

    const pastedText = e.clipboardData.getData("text");

    if (typeof pastedText === "string") {
      setInitialValues((prev) => ({ ...prev, description: pastedText }));
      setIsUpdateModalOpen(true);

      // // setTimeout with 0 timeout to make this async so it'll focus textArea AFTER the modal with textArea was mounted (it will be mounted once you call setIsUpdateModalOpen(true) function above)
      setTimeout(() => {
        descriptionTextAreaRef.current?.focus({ preventScroll: true });
      }, 0);
    }
  };

  const onEditableDivKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
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
          <div
            ref={editableDivRef}
            onPaste={handlePasteEditableDiv}
            contentEditable
            onKeyPress={onEditableDivKeyPress}
            // for some reason this div needs border property (at least 1px). Otherwise it won't work on chrome
            style={{ width: 0, height: 0, border: "1px solid transparent" }}
          />

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
              setInitialValues((prev) => ({
                ...prev,
                description:
                  descriptionTextAreaRef.current?.textContent || // save current textContent of textArea input. TextArea was focued right after opening modal which means it has pasted data from clipboard so we can use it here and save as the new initial value so when user opens the modal again, they will see the previously pasted data
                  prev.description,
              }));
              editableDivRef.current?.focus({ preventScroll: true }); // focus editableDiv so it can again open modal on paste event
            }}
            maxWidthOnDesktop={1000}
            widthOnDesktop="100%"
          >
            <BasicDataForm
              maxWidth="100%"
              onSubmitSideEffect={() => {
                fetchScenery();
                setIsUpdateModalOpen(false);
                editableDivRef.current?.focus({ preventScroll: true }); // focus editableDiv so it can again open modal on paste event
              }}
              onCancelBtnClick={(values) => {
                setInitialValues(values); // values are `values` key (formik form values) destructured from children prop of Formik used as a function
                setIsUpdateModalOpen(false);
                editableDivRef.current?.focus({ preventScroll: true }); // focus editableDiv so it can again open modal on paste event
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
                {t("buttons.pasteEvent")}
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
