import { Switch } from "react-router-dom";
import Route from "common/router/Route";
import PrivateRoute from "common/router/PrivateRoute";
import {
  PATHS_CORE,
  PATHS_DASHBOARD,
  PATHS_SCENERY,
  PATHS_CHARACTER,
} from "common/constants/paths";

import Login from "core/views/Login";
import Logout from "core/views/Logout";
import NotFound from "core/views/NotFound";

import Dashboard from "features/Dashboard/views/Dashboard";

import Account from "core/views/Account/Account";
import ForgotPassword from "core/views/ForgotPassword/ForgotPassword";
import ResetPassword from "core/views/ResetPassword/ResetPassword";

import useTokenListener from "common/auth/useTokenListener";

import { avaliableLanguages } from "locales";
import useLocalizedPath from "common/router/useLocalizedPath";

import SceneryList from "features/scenery/views/SceneryList";
import SceneryAdd from "features/scenery/views/SceneryAdd";
import SceneryEdit from "features/scenery/views/SceneryEdit";

import CharacterList from "features/character/views/CharacterList";
import CharacterAdd from "features/character/views/CharacterAdd";
import CharacterEdit from "features/character/views/CharacterEdit";

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
          <Route
            path={path(PATHS_CORE.PASSWORD_FORGOT, lang)}
            component={ForgotPassword}
            exact
          />,
          <Route
            path={path(PATHS_CORE.PASSWORD_RESET, lang)}
            component={ResetPassword}
            exact
          />,
          <PrivateRoute
            path={`${path(PATHS_CORE.ACCOUNT, lang)}`}
            component={Account}
            exact
          />,
          <PrivateRoute
            path={`${path(PATHS_DASHBOARD.DASHBOARD, lang)}`}
            component={Dashboard}
            exact
          />,
          <PrivateRoute
            path={`${path(PATHS_SCENERY.LIST, lang)}`}
            component={SceneryList}
            exact
          />,
          <PrivateRoute
            path={`${path(PATHS_SCENERY.ADD, lang)}`}
            component={SceneryAdd}
            exact
          />,
          <PrivateRoute
            path={`${path(PATHS_SCENERY.EDIT(":id"), lang)}`}
            component={SceneryEdit}
            exact
          />,
          <PrivateRoute
            path={`${path(PATHS_CHARACTER.LIST, lang)}`}
            component={CharacterList}
            exact
          />,
          <PrivateRoute
            path={`${path(PATHS_CHARACTER.ADD, lang)}`}
            component={CharacterAdd}
            exact
          />,
          <PrivateRoute
            path={`${path(PATHS_CHARACTER.EDIT(":id"), lang)}`}
            component={CharacterEdit}
            exact
          />,
        ];
      })}

      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Router;
