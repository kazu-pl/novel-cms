import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { Link } from "react-router-dom";
import { PATHS_DASHBOARD } from "common/constants/paths";
import getLocalizedPath from "common/router/useLocalizedPath";

export interface DashboardNewProps {}

const DashboardNew = (props: DashboardNewProps) => {
  const { path } = getLocalizedPath();
  return (
    <DashboardLayoutWrapper>
      <Link to={path(PATHS_DASHBOARD.DASHBOARD)}>Dashboard </Link>
      Dashboard NEW
    </DashboardLayoutWrapper>
  );
};

export default DashboardNew;
