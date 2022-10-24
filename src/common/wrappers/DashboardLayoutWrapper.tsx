import Dashboard, { DashboardProps } from "novel-ui/lib/layouts/Dashboard";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountIcon from "@mui/icons-material/Person";
import ImageIcon from "@mui/icons-material/Image";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import ColoredIconWrapper from "novel-ui/lib/ColoredIconWrapper";
import {
  PATHS_CORE,
  PATHS_DASHBOARD,
  PATHS_SCENERY,
  PATHS_CHARACTER,
  PATHS_ACT,
} from "common/constants/paths";

import { useAppSelector } from "common/store/hooks";

import { selectUserProfile } from "core/store/userSlice";

import LangSwicher from "components/LangSwitcher/LangSwitcher";

import getLocalizedPath from "common/router/useLocalizedPath";

import { useTranslation } from "react-i18next";

import { API_URL } from "common/constants/env";

export interface DashboardLayoutWrapperProps
  extends Pick<DashboardProps, "additionalControls"> {
  children: React.ReactNode;
  title?: DashboardProps["title"];
}

const DashboardLayoutWrapper = ({
  children,
  title = "Dashboard",
  ...rest
}: DashboardLayoutWrapperProps) => {
  const { path } = getLocalizedPath();
  const userProfileData = useAppSelector(selectUserProfile);
  const { t } = useTranslation();

  const isReactSnapRunning = navigator.userAgent === "ReactSnap";

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
        userDropdown: isReactSnapRunning
          ? [
              {
                icon: <AccountIcon />,
                to: path(PATHS_CORE.ACCOUNT),
                label: t("dashboardPage.userDropdown.account"),
              },
              // if react snap is running then DO NOT PASS /logout route because it has redirect which would cause problems with react-snap
            ]
          : [
              {
                icon: <AccountIcon />,
                to: path(PATHS_CORE.ACCOUNT),
                label: t("dashboardPage.userDropdown.account"),
              },
              // here we are in real browser and not in react-snap so we can add /logout route
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
            label: t("dashboardSidebarItems.dashboard"),
            to: path(PATHS_DASHBOARD.DASHBOARD),
          },
          {
            variant: "no-dropdown",
            icon: (
              <ColoredIconWrapper color="grey">
                <AccountIcon />
              </ColoredIconWrapper>
            ),
            label: t("dashboardSidebarItems.account"),
            to: path(PATHS_CORE.ACCOUNT),
            renderBottomLine: true,
          },
          {
            variant: "with-dropdown",
            icon: (
              <ColoredIconWrapper color="grey">
                <ImageIcon />
              </ColoredIconWrapper>
            ),
            label: t("dashboardSidebarItems.scenery.title"),
            dropdownItems: [
              {
                label: t("dashboardSidebarItems.scenery.items.list"),
                to: path(PATHS_SCENERY.LIST),
              },
              {
                label: t("dashboardSidebarItems.scenery.items.add"),
                to: path(PATHS_SCENERY.ADD),
              },
            ],
          },
          {
            variant: "with-dropdown",
            icon: (
              <ColoredIconWrapper color="grey">
                <EmojiPeopleIcon />
              </ColoredIconWrapper>
            ),
            label: t("dashboardSidebarItems.character.title"),
            dropdownItems: [
              {
                label: t("dashboardSidebarItems.character.items.list"),
                to: path(PATHS_CHARACTER.LIST),
              },
              {
                label: t("dashboardSidebarItems.character.items.add"),
                to: path(PATHS_CHARACTER.ADD),
              },
            ],
          },
          {
            variant: "with-dropdown",
            icon: (
              <ColoredIconWrapper color="grey">
                <AlignHorizontalLeftIcon />
              </ColoredIconWrapper>
            ),
            label: t("dashboardSidebarItems.acts.title"),
            dropdownItems: [
              {
                label: t("dashboardSidebarItems.acts.items.list"),
                to: path(PATHS_ACT.LIST),
              },
              {
                label: t("dashboardSidebarItems.acts.items.add"),
                to: path(PATHS_ACT.ADD),
              },
            ],
          },
        ],
      }}
      {...rest}
    >
      {children}
    </Dashboard>
  );
};

export default DashboardLayoutWrapper;
