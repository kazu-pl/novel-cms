import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import HelmetDecorator from "components/HelmetDecorator";
import { Act, SuccessfulReqMsg } from "types/novel-server.types";
import { useTranslation } from "react-i18next";
import { FormikHelpers } from "formik";
import { useEffect } from "react";
import {
  selectActDictionary,
  fetchActsDictionary,
  addNewAct,
} from "features/act/store/actSlice";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import useLocalizedPath from "common/router/useLocalizedPath";
import { PATHS_ACT } from "common/constants/paths";
import ActForm from "features/act/components/ActForm";

const initialValues: Act = {
  title: "",
  description: "",
  type: "normal",
  nextAct: "",
  scenes: [],
};

const ActAdd = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { path } = useLocalizedPath();

  const actDictionary = useAppSelector(selectActDictionary);
  const isDistionaryFetching = useAppSelector(
    (state) => state.act.actsDictionary.isFetching
  );

  const handleSubmit = async (values: Act, actions: FormikHelpers<Act>) => {
    try {
      const response = await dispatch(addNewAct(values));
      const payload = response.payload as SuccessfulReqMsg;
      navigate(path(PATHS_ACT.LIST));
      enqueueSnackbar(payload.message, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchActsDictionary());
  }, [dispatch]);

  return (
    <>
      <HelmetDecorator
        description={t("actsPages.add.metaData.descrption")}
        imageAlt={t("actsPages.add.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("actsPages.add.metaData.title")}
      />
      <DashboardLayoutWrapper title={t("actsPages.add.title")}>
        {isDistionaryFetching ? (
          <div>Loading</div>
        ) : (
          <ActForm
            onSubmit={handleSubmit}
            actDictionary={actDictionary!}
            initialValues={initialValues}
            submitButtonLabel={t("buttons.add")}
          />
        )}
      </DashboardLayoutWrapper>
    </>
  );
};

export default ActAdd;
