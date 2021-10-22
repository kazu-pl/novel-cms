import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { Link } from "react-router-dom";
import { PATHS_DASHBOARD } from "common/constants/paths";
import getLocalizedPath from "common/router/useLocalizedPath";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";

export interface DashboardNewProps {}

const DashboardNew = (props: DashboardNewProps) => {
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
        <Link to={path(PATHS_DASHBOARD.DASHBOARD)}>Dashboard </Link>
        this is Dashboard NEW
      </DashboardLayoutWrapper>
    </>
  );
};

export default DashboardNew;
