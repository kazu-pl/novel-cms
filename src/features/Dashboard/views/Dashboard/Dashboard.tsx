import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";

const Dashboard = () => {
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
        this is Dashboard. There will be some graphs here in the futere.
      </DashboardLayoutWrapper>
    </>
  );
};

export default Dashboard;
