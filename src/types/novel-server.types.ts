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
 * @example {"password":"admin123","repeatedPassword":"admin123","email":"admin@asd.pl","name":"John","surname":"Doe"}
 */
export interface RequestRegisterCredentials {
  /** password */
  password: string;

  /** the same password passed twice */
  repeatedPassword: string;

  /** email */
  email: string;

  /** your name */
  name: string;

  /** your surname */
  surname: string;
}

/**
 * @example {"email":"admin@asd.pl","password":"admin123"}
 */
export interface RequestLoginCredentials {
  /** email that is used to log in */
  email: string;

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

/**
 * @example {"name":"John","surname":"Doe","email":"admin@asd.pl"}
 */
export interface UserProfile {
  /** user name */
  name: string;

  /** user surname */
  surname: string;

  /** email */
  email: string;
}

/**
 * @example {"name":"John","surname":"Doe","email":"admin@asd.pl"}
 */
export interface RequestUpdateUser {
  /** user name */
  name: string;

  /** user surname */
  surname: string;

  /** user email */
  email: string;
}

/**
 * @example {"email":"admin@asd.pl"}
 */
export interface RequestRemindPasswordCredentials {
  /** On the email we will send you your password */
  email: string;
}

/**
 * @example {"password":"qwerty123","repeatedPassword":"qwerty123"}
 */
export interface RequestRenewPassword {
  /** new password */
  password: string;
  repeatedPassword: string;
}
