import { Switch, Route } from "react-router-dom";
import PrivateRoute from "common/router/PrivateRoute";
import { PATHS_CORE, PATHS_DASHBOARD } from "common/constants/paths";

import Login from "core/views/Login";
import Logout from "core/views/Logout";
import NotFound from "core/views/NotFound";

import Dashboard from "features/Dashboard/views/Dashboard";
import DashboardNew from "features/Dashboard/views/DashboardNew/DashboardNew";

import useTokenListener from "common/auth/useTokenListener";

const Router = () => {
  useTokenListener();
  return (
    <Switch>
      <Route path={PATHS_CORE.LOGIN} exact component={Login} />
      <Route path={PATHS_CORE.LOGOUT} exact component={Logout} />
      <PrivateRoute
        path={PATHS_DASHBOARD.DASHBOARD}
        exact
        component={Dashboard}
      />
      <PrivateRoute
        path={PATHS_DASHBOARD.DASHBOARD_NEW}
        exact
        component={DashboardNew}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
