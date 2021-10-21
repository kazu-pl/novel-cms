import { Switch } from "react-router-dom";
import Route from "common/router/Route";
import PrivateRoute from "common/router/PrivateRoute";
import { PATHS_CORE, PATHS_DASHBOARD } from "common/constants/paths";

import Login from "core/views/Login";
import Logout from "core/views/Logout";
import NotFound from "core/views/NotFound";

import Dashboard from "features/Dashboard/views/Dashboard";
import DashboardNew from "features/Dashboard/views/DashboardNew/DashboardNew";

import useTokenListener from "common/auth/useTokenListener";

import { avaliableLanguages } from "locales";
import useLocalizedPath from "common/router/useLocalizedPath";

const Router = () => {
  useTokenListener();
  const { path } = useLocalizedPath();
  return (
    <Switch>
      {avaliableLanguages.map((lang) => {
        return [
          <Route path={path(PATHS_CORE.LOGIN, lang)} component={Login} exact />,
          <Route
            path={path(PATHS_CORE.LOGOUT, lang)}
            component={Logout}
            exact
          />,
          <PrivateRoute
            path={`${path(PATHS_DASHBOARD.DASHBOARD, lang)}`}
            component={Dashboard}
            exact
          />,
          <PrivateRoute
            path={`${path(PATHS_DASHBOARD.DASHBOARD_NEW, lang)}`}
            component={DashboardNew}
            exact
          />,
        ];
      })}

      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Router;
