import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { Link } from "react-router-dom";
import { PATHS_DASHBOARD } from "common/constants/paths";

export interface DashboardNewProps {}

const DashboardNew = (props: DashboardNewProps) => {
  return (
    <DashboardLayoutWrapper>
      <Link to={PATHS_DASHBOARD.DASHBOARD}>Dashboard </Link>
      Dashboard NEW
    </DashboardLayoutWrapper>
  );
};

export default DashboardNew;
