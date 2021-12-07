import { API_URL } from "common/constants/env";

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

export const PATHS_ACT = {
  LIST: "/acts/list",
  ADD: "/acts/add",
  EDIT: (path: string) => `/acts/${path}/edit`,
};

export const PATHS_FILES = {
  FILES: (link: string) => `/files${link[0] === "/" ? link : `/${link}`}`,
  /**
   * Creates url to get file from server
   * @param fileName is a just a file name without any url prefixes
   * @returns string
   */
  FILE_GET_API_LINK: (fileName: string) => `${API_URL}/files/${fileName}`,
};
