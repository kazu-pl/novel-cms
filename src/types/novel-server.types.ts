/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * @example {"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFzZCIsImlhdCI6MTYzNDM3MjQ3NiwiZXhwIjoxNjM0MzcyNTA2fQ.KVLILQs_Brp_WRtOmPGi86l40hOnoxnd32XK5rI33EQ","refreshToken":"5bhk88956redhjjgfhI1NiIsInR5cCI6IkpXVCJ9.B6rfTYJr4GHhdbig56y7h7hg4g4ghy6Hh6MTYzNDM3MjQ3fggfghreeghute3NjM0T.KVLILQs_Brp_WRtOmPGi86l40hOnoxnd32XK5rI33EQ"}
 */
export interface Tokens {
  /** token used to authenticate and authorize user. */
  accessToken: string;

  /** token used to regenerate new accessToken if it expired */
  refreshToken: string;
}

/**
 * @example {"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFzZCIsImlhdCI6MTYzNDM3MjQ3NiwiZXhwIjoxNjM0MzcyNTA2fQ.KVLILQs_Brp_WRtOmPGi86l40hOnoxnd32XK5rI33EQ"}
 */
export interface AccessToken {
  /** token used to authenticate and authorize user. */
  accessToken: string;
}

/**
 * @example {"login":"myLogin","password":"Pa$sWorD","repeatedPassword":"Pa$sWorD"}
 */
export interface RequestRegisterCredentials {
  /** login used to register */
  login: string;

  /** password */
  password: string;

  /** the same password passed twice */
  repeatedPassword: string;
}

/**
 * @example {"login":"myLogin","password":"Pa$sWorD"}
 */
export interface RequestLoginCredentials {
  /** Login that is used to log in */
  login: string;

  /** password */
  password: string;
}

/**
 * @example {"refreshToken":"5bhk88956redhjjgfhI1NiIsInR5cCI6IkpXVCJ9.B6rfTYJr4GHhdbig56y7h7hg4g4ghy6Hh6MTYzNDM3MjQ3fggfghreeghute3NjM0T.KVLILQs_Brp_WRtOmPGi86l40hOnoxnd32XK5rI33EQ"}
 */
export interface RequestRefreshTokenCredentials {
  /** refreshToken */
  refreshToken: string;
}
