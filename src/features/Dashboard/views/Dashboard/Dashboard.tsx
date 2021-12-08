import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import { useAppSelector } from "common/store/hooks";
import {
  selectIsUserProfileFetching,
  selectUserProfile,
} from "core/store/userSlice";
import CircularProgress from "@mui/material/CircularProgress";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const userData = useAppSelector(selectUserProfile);
  const isLoading = useAppSelector(selectIsUserProfileFetching);
  return (
    <>
      <HelmetDecorator
        description={t("loginPage.metaData.descrption")}
        imageAlt={t("loginPage.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("dashboardPage.metaData.title")}
      />
      <DashboardLayoutWrapper>
        {isLoading ? (
          <CircularProgress />
        ) : (
          `Hello, ${userData?.name} ${userData?.surname}!`
        )}
      </DashboardLayoutWrapper>
    </>
  );
};

export default Dashboard;
