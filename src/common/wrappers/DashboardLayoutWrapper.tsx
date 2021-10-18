import Dashboard from "novel-ui/lib/layouts/Dashboard";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";
import DashboardIcon from "@mui/icons-material/Dashboard";

import ColoredIconWrapper from "novel-ui/lib/ColoredIconWrapper";
import { PATHS_CORE, PATHS_DASHBOARD } from "common/constants/paths";

export interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayoutWrapper = ({
  children,
  title = "Dashboard",
}: DashboardLayoutWrapperProps) => {
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
          title: "John Doe",
        },
        userDropdown: [
          {
            icon: <LogoutIcon />,
            to: PATHS_CORE.LOGOUT,
            label: "Logout",
            isErrorColor: true,
          },
        ],
        additionalControls: (
          <ColoredIconWrapper color="white">
            <LanguageIcon />
          </ColoredIconWrapper>
        ),
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
            to: PATHS_DASHBOARD.DASHBOARD,
          },
        ],
      }}
    >
      {children}
    </Dashboard>
  );
};

export default DashboardLayoutWrapper;
