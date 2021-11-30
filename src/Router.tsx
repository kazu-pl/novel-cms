import { Routes, Route } from "react-router-dom";
import LocalizedRoute from "common/router/Route";
import LocalizedPrivateRoute from "common/router/PrivateRoute";
import {
  PATHS_CORE,
  PATHS_DASHBOARD,
  PATHS_SCENERY,
  PATHS_CHARACTER,
  PATHS_ACT,
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

import ActAdd from "features/act/views/ActAdd";

const Router = () => {
  useTokenListener();
  const { path } = useLocalizedPath();

  return (
    <Routes>
      {avaliableLanguages.map((lang) => {
        return [
          <Route
            path={path(PATHS_CORE.LOGIN, lang)}
            element={
              <LocalizedRoute>
                <Login />
              </LocalizedRoute>
            }
            // exact - this no longer is needed (rr6 looks for exact matches by default)
          />,
          <Route
            path={path(PATHS_CORE.LOGOUT, lang)}
            element={
              <LocalizedRoute>
                <Logout />
              </LocalizedRoute>
            }
          />,
          <Route
            path={path(PATHS_CORE.PASSWORD_FORGOT, lang)}
            element={
              <LocalizedRoute>
                <ForgotPassword />
              </LocalizedRoute>
            }
          />,
          <Route
            path={path(PATHS_CORE.PASSWORD_RESET, lang)}
            element={
              <LocalizedRoute>
                <ResetPassword />
              </LocalizedRoute>
            }
          />,
          <Route
            path={`${path(PATHS_CORE.ACCOUNT, lang)}`}
            element={
              <LocalizedPrivateRoute>
                <Account />
              </LocalizedPrivateRoute>
            }
          />,
          <Route
            path={`${path(PATHS_DASHBOARD.DASHBOARD, lang)}`}
            element={
              <LocalizedPrivateRoute>
                <Dashboard />
              </LocalizedPrivateRoute>
            }
          />,
          <Route
            path={`${path(PATHS_SCENERY.LIST, lang)}`}
            element={
              <LocalizedPrivateRoute>
                <SceneryList />
              </LocalizedPrivateRoute>
            }
          />,
          <Route
            path={`${path(PATHS_SCENERY.ADD, lang)}`}
            element={
              <LocalizedPrivateRoute>
                <SceneryAdd />
              </LocalizedPrivateRoute>
            }
          />,
          <Route
            path={`${path(PATHS_SCENERY.EDIT(":id"), lang)}`}
            element={
              <LocalizedPrivateRoute>
                <SceneryEdit />
              </LocalizedPrivateRoute>
            }
          />,
          <Route
            path={`${path(PATHS_CHARACTER.LIST, lang)}`}
            element={
              <LocalizedPrivateRoute>
                <CharacterList />
              </LocalizedPrivateRoute>
            }
          />,
          <Route
            path={`${path(PATHS_CHARACTER.ADD, lang)}`}
            element={
              <LocalizedPrivateRoute>
                <CharacterAdd />
              </LocalizedPrivateRoute>
            }
          />,
          <Route
            path={`${path(PATHS_CHARACTER.EDIT(":id"), lang)}`}
            element={
              <LocalizedPrivateRoute>
                <CharacterEdit />
              </LocalizedPrivateRoute>
            }
          />,
          <Route
            path={`${path(PATHS_ACT.ADD, lang)}`}
            element={
              <LocalizedPrivateRoute>
                <ActAdd />
              </LocalizedPrivateRoute>
            }
          />,
        ];
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
