import Dashboard from "novel-ui/lib/layouts/Dashboard";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountIcon from "@mui/icons-material/Person";

import DashboardIcon from "@mui/icons-material/Dashboard";

import ColoredIconWrapper from "novel-ui/lib/ColoredIconWrapper";
import { PATHS_CORE, PATHS_DASHBOARD } from "common/constants/paths";

import { useAppSelector } from "common/store/hooks";

import { selectUserProfile } from "core/store/userSlice";

import LangSwicher from "components/LangSwitcher/LangSwitcher";

import getLocalizedPath from "common/router/useLocalizedPath";

import { useTranslation } from "react-i18next";

import { API_URL } from "common/constants/env";

export interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayoutWrapper = ({
  children,
  title = "Dashboard",
}: DashboardLayoutWrapperProps) => {
  const { path } = getLocalizedPath();
  const userProfileData = useAppSelector(selectUserProfile);
  const { t } = useTranslation();

  return (
    <Dashboard
      title={title}
      appBarProps={{
        logo: (
          <ColoredIconWrapper color="white">
            <AcUnitIcon />
          </ColoredIconWrapper>
        ),
        userData: {
          title: userProfileData
            ? `${userProfileData.name} ${userProfileData.surname}`
            : " ",
          avatarLink: userProfileData?.avatar
            ? `${API_URL + userProfileData?.avatar}`
            : undefined,
        },
        userDropdown: [
          {
            icon: <AccountIcon />,
            to: PATHS_CORE.ACCOUNT,
            label: t("dashboardPage.userDropdown.account"),
          },
          {
            icon: <LogoutIcon />,
            to: PATHS_CORE.LOGOUT,
            label: t("dashboardPage.userDropdown.logout"),
            isErrorColor: true,
          },
        ],
        additionalControls: <LangSwicher />,
      }}
      sidebarProps={{
        sidebarItems: [
          {
            variant: "no-dropdown",
            icon: (
              <ColoredIconWrapper color="grey">
                <DashboardIcon />
              </ColoredIconWrapper>
            ),
            label: t("dashboardPage.sidebar.dashboard"),
            to: path(PATHS_DASHBOARD.DASHBOARD),
          },
          {
            variant: "no-dropdown",
            icon: (
              <ColoredIconWrapper color="grey">
                <AccountIcon />
              </ColoredIconWrapper>
            ),
            label: t("dashboardPage.sidebar.account"),
            to: path(PATHS_CORE.ACCOUNT),
            renderBottomLine: true,
          },
        ],
      }}
    >
      {children}
    </Dashboard>
  );
};

export default DashboardLayoutWrapper;
