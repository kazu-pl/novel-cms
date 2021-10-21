import { PATHS_DASHBOARD } from "common/constants/paths";
import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { Link } from "react-router-dom";

import getLocalizedPath from "common/router/useLocalizedPath";

const Dashboard = () => {
  const { path } = getLocalizedPath();
  return (
    <DashboardLayoutWrapper>
      <Link to={path(PATHS_DASHBOARD.DASHBOARD_NEW)}>Dashboard NEW</Link>
      this is Dashboard
    </DashboardLayoutWrapper>
  );
};

export default Dashboard;
