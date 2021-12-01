import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import HelmetDecorator from "components/HelmetDecorator";
import { fetchSingleAct, selectSingleAct } from "features/act/store/actSlice";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import NotFoundWrapper from "common/wrappers/NotFoundWrapper";
import { useSnackbar } from "notistack";
import { useEffect, useCallback } from "react";

export interface ActEditProps {}

const ActEdit = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const act = useAppSelector(selectSingleAct);
  const { enqueueSnackbar } = useSnackbar();

  const fetchAct = useCallback(async () => {
    try {
      await dispatch(fetchSingleAct(id));
    } catch (error) {
      if (error) {
        enqueueSnackbar(error as string, {
          variant: "error",
        });
      }
    }
  }, [dispatch, id, enqueueSnackbar]);

  useEffect(() => {
    fetchAct();
  }, [fetchAct]);

  return (
    <>
      <HelmetDecorator
        description={t("actsPages.edit.metaData.descrption")}
        imageAlt={t("actsPages.edit.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("actsPages.edit.metaData.title")}
      />
      <DashboardLayoutWrapper title={t("actsPages.edit.title")}>
        <NotFoundWrapper isLoadingData={act.isFetching} isNotFound={!act.data}>
          załadowano
        </NotFoundWrapper>
      </DashboardLayoutWrapper>
    </>
  );
};

export default ActEdit;
