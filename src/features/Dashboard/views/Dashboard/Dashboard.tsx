import { PATHS_DASHBOARD } from "common/constants/paths";
import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import getLocalizedPath from "common/router/useLocalizedPath";
import HelmetDecorator from "components/HelmetDecorator";

const Dashboard = () => {
  const { path } = getLocalizedPath();
  const { t, i18n } = useTranslation();
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
        <Link to={path(PATHS_DASHBOARD.DASHBOARD_NEW)}>Dashboard NEW</Link>
        this is Dashboard
      </DashboardLayoutWrapper>
    </>
  );
};

export default Dashboard;
