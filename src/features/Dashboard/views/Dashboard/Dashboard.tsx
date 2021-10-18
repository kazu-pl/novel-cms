import { PATHS_CORE } from "common/constants/paths";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <p>DASHBOARD - PROTECTED</p>
      <Link to={PATHS_CORE.LOGOUT}>LOGOUT</Link>
    </div>
  );
};

export default Dashboard;
