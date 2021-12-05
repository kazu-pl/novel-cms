import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import HelmetDecorator from "components/HelmetDecorator";
import {
  fetchActsDictionary,
  fetchSingleAct,
  selectActDictionary,
  selectSingleAct,
  updateAct,
} from "features/act/store/actSlice";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import NotFoundWrapper from "common/wrappers/NotFoundWrapper";
import { useSnackbar } from "notistack";
import ActForm, { ActFormProps } from "features/act/components/ActForm";
import { CircularProgress } from "@mui/material";
import { Act, ActExtended, SuccessfulReqMsg } from "types/novel-server.types";
import { useNavigate } from "react-router-dom";
import useLocalizedPath from "common/router/useLocalizedPath";
import { PATHS_ACT } from "common/constants/paths";
import { useState, useEffect } from "react";

export interface ActEditProps {}

const ActEdit = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const act = useAppSelector(selectSingleAct);
  const { enqueueSnackbar } = useSnackbar();
  const { path } = useLocalizedPath();
  const navigate = useNavigate();
  const actDictionary = useAppSelector(selectActDictionary);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      await Promise.all([
        dispatch(fetchSingleAct(id)),
        dispatch(fetchActsDictionary()),
      ]);

      setIsLoading(false);
    };

    fetch();
  }, [dispatch, id]);

  const handleSubmit: ActFormProps["onSubmit"] = async (values, helpers) => {
    try {
      const response = await dispatch(updateAct(values as ActExtended));
      const payload = response.payload as SuccessfulReqMsg;
      enqueueSnackbar(payload.message, {
        variant: "info",
      });
      navigate(path(PATHS_ACT.LIST));
    } catch (error) {
      if (error) {
        enqueueSnackbar(error as string, {
          variant: "error",
        });
      }
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

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
        <NotFoundWrapper isLoadingData={isLoading} isNotFound={!act.data}>
          {!!actDictionary && !!act.data && (
            <ActForm
              actDictionary={actDictionary}
              initialValues={act.data as Act}
              onSubmit={handleSubmit}
              submitButtonLabel={t("buttons.update")}
            />
          )}
        </NotFoundWrapper>
      </DashboardLayoutWrapper>
    </>
  );
};

export default ActEdit;
