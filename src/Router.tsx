import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Route and PrivateRoute also could be lazy loaded but it almost has no effect so I left it like so
import LocalizedRoute from "common/router/Route";
import LocalizedPrivateRoute from "common/router/PrivateRoute";

import {
  PATHS_CORE,
  PATHS_DASHBOARD,
  PATHS_SCENERY,
  PATHS_CHARACTER,
  PATHS_ACT,
  PATHS_FILES,
} from "common/constants/paths";

import useTokenListener from "common/auth/useTokenListener";

import { avaliableLanguages } from "locales";
import useLocalizedPath from "common/router/useLocalizedPath";

const Files = lazy(() => import("features/files/views/Files"));

const Login = lazy(() => import("core/views/Login"));
const Logout = lazy(() => import("core/views/Logout"));
const ForgotPassword = lazy(
  () => import("core/views/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("core/views/ResetPassword/ResetPassword")
);
const NotFound = lazy(() => import("core/views/NotFound"));

const Account = lazy(() => import("core/views/Account/Account"));
const Dashboard = lazy(() => import("features/Dashboard/views/Dashboard"));

const SceneryList = lazy(() => import("features/scenery/views/SceneryList"));
const SceneryAdd = lazy(() => import("features/scenery/views/SceneryAdd"));
const SceneryEdit = lazy(() => import("features/scenery/views/SceneryEdit"));

const CharacterList = lazy(
  () => import("features/character/views/CharacterList")
);
const CharacterAdd = lazy(
  () => import("features/character/views/CharacterAdd")
);
const CharacterEdit = lazy(
  () => import("features/character/views/CharacterEdit")
);

const ActAdd = lazy(() => import("features/act/views/ActAdd"));
const ActList = lazy(() => import("features/act/views/ActList"));
const ActEdit = lazy(() => import("features/act/views/ActEdit/ActEdit"));

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
            path={`${path(PATHS_ACT.LIST, lang)}`}
            element={
              <LocalizedPrivateRoute>
                <ActList />
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
          <Route
            path={`${path(PATHS_ACT.EDIT(":id"), lang)}`}
            element={
              <LocalizedPrivateRoute>
                <ActEdit />
              </LocalizedPrivateRoute>
            }
          />,
        ];
      })}
      <Route path={PATHS_FILES.FILES(":fileName")} element={<Files />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
