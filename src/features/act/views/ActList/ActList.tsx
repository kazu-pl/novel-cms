import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";

const ActList = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayoutWrapper title={t("actsPages.list.title")}>
      tabela here
    </DashboardLayoutWrapper>
  );
};

export default ActList;
