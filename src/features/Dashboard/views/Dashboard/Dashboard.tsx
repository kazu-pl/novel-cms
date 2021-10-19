import { PATHS_DASHBOARD } from "common/constants/paths";
import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <DashboardLayoutWrapper>
      <Link to={PATHS_DASHBOARD.DASHBOARD_NEW}>Dashboard NEW</Link>
      Dashboard
    </DashboardLayoutWrapper>
  );
};

export default Dashboard;
