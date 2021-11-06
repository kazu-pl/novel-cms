export const NOT_FOUND_LINK_WITHOUT_SLASH = "404";

export const PATHS_CORE = {
  HOMEPAGE: "/",
  LOGIN: "/",
  LOGOUT: "/logout",
  NOT_FOUND: `/${NOT_FOUND_LINK_WITHOUT_SLASH}`,
  ACCOUNT: "/account",
  PASSWORD_FORGOT: "/forgot-password",
  PASSWORD_RESET: "/reset-password/:userId",
};

export const PATHS_DASHBOARD = {
  DASHBOARD: "/dashboard",
};

export const PATHS_SCENERY = {
  LIST: "/scenery/list",
  ADD: "/scenery/add",
  EDIT: (path: string) => `/scenery/${path}/edit`,
};

export const PATHS_CHARACTER = {
  LIST: "/character/list",
  ADD: "/character/add",
  EDIT: (path: string) => `/character/${path}/edit`,
};
