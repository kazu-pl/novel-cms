import Dashboard from "novel-ui/lib/layouts/Dashboard";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LogoutIcon from "@mui/icons-material/Logout";

import DashboardIcon from "@mui/icons-material/Dashboard";

import ColoredIconWrapper from "novel-ui/lib/ColoredIconWrapper";
import { PATHS_CORE, PATHS_DASHBOARD } from "common/constants/paths";

import { useAppDispatch, useAppSelector } from "common/store/hooks";
import { fetchSomeProtectedData } from "core/store/userSlice";
import Button from "novel-ui/lib/buttons/Button";
import { selectUserProfile } from "core/store/userSlice";

import LangSwicher from "components/LangSwitcher/LangSwitcher";

import getLocalizedPath from "common/router/useLocalizedPath";

export interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayoutWrapper = ({
  children,
  title = "Dashboard",
}: DashboardLayoutWrapperProps) => {
  const dispatch = useAppDispatch();
  const { path } = getLocalizedPath();
  const userProfileData = useAppSelector(selectUserProfile);

  const handleGetData = async () => {
    try {
      await dispatch(fetchSomeProtectedData());
    } catch (err) {
      console.log({ message: "ERROR IN REACT", err });
    }
  };

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
        },
        userDropdown: [
          {
            icon: <LogoutIcon />,
            to: PATHS_CORE.LOGOUT,
            label: "Logout",
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
            label: "Dashboard",
            to: path(PATHS_DASHBOARD.DASHBOARD),
          },
        ],
      }}
    >
      <Button onClick={handleGetData}>POBIERZ COŚ Z API</Button>
      {children}
    </Dashboard>
  );
};

export default DashboardLayoutWrapper;
