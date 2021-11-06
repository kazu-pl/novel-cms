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
 * @example {"name":"John","surname":"Doe","email":"admin@asd.pl","avatar":"/files/some_avatar.png"}
 */
export interface UserProfile {
  /** user name */
  name: string;

  /** user surname */
  surname: string;

  /** email */
  email: string;

  /** relative link to avatar img (empty string if no avatar avaliable) */
  avatar?: string;
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

/**
 * @example {"avatarUrl":"/files/some_avatar.png"}
 */
export interface Avatar {
  /** new avatar string or empty string if no avatar avaliable */
  avatarUrl: string;
}

/**
 * this type is the type of response you can try in then() in components try/catch block
 * @example {"message":"resource was created successfuly"}
 */
export interface SuccessfulReqMsg {
  /** message you can dispaly on front application */
  message: string;
}

/**
 * this type is the type of error you can catch in catch() in redux-toolkit createAsyncThunk
 * @example {"message":"An error occured when trying to register new resource","error":"error object."}
 */
export interface FailedReqMsg {
  /** response message */
  message: string;

  /** response error */
  error?: any;
}

/**
 * type of request data passed in request when creating new scenery or update basic scenery data
 * @example {"title":"mansion","description":"main character mansion"}
 */
export interface RequestScenery {
  /** scenery title */
  title: string;

  /** scenery description */
  description: string;
}

/**
 * single scenery image
 * @example {"originalName":"in-flames_owl_boy.png","url":"/files/1635858781056-in-flames_owl_boy.png","filename":"1635858781056-in-flames_owl_boy.png","_id":"6181395d67568b70180ce91b"}
 */
export interface SceneryImage {
  /** the original name before being sent to server */
  originalName: string;

  /** url to get scenery image */
  url: string;

  /** name of the resource under which you can find it on server */
  filename: string;

  /** resource id */
  _id: string;
}

/**
 * single scenery
 * @example {"_id":"6181395d67568b70180ce93b","title":"mansion","description":"main character mansion","imagesList":[],"__v":0,"createdAt":"2021-11-04T11:01:42.143+00:00","updatedAt":"2021-11-04T11:01:42.143+00:00"}
 */
export interface Scenery {
  /** mongodb id */
  _id: string;

  /** scenery title */
  title: string;

  /** scenery description */
  description: string;

  /** array of scenery images */
  imagesList: SceneryImage[];

  /** mongodb __v */
  __v: number;

  /** create timestamp */
  createdAt: string;

  /** update timestamp */
  updatedAt: string;
}

/**
 * response with scenery data in `data` key
 */
export interface SingleSceneryResponse {
  /** scenery */
  data: Scenery;
}

/**
 * returns list of sceneries (if no filters specified, returns first 5 sceneries)
 */
export interface SceneriesResponse {
  /** list of sceneries */
  data: Scenery[];

  /** number of total sceneries */
  totalItems: number;
}

/**
 * type of request data passed in request when creating new character or update basic character data
 * @example {"title":"Yuuta","description":"main character"}
 */
export interface RequestCharacter {
  /** character title */
  title: string;

  /** character description */
  description: string;
}

/**
 * single character image
 * @example {"originalName":"in-flames_owl_boy.png","url":"/files/1635858781056-in-flames_owl_boy.png","filename":"1635858781056-in-flames_owl_boy.png","_id":"6181395d67568b70180ce91b"}
 */
export interface CharacterImage {
  /** the original name before being sent to server */
  originalName: string;

  /** url to get character image */
  url: string;

  /** name of the resource under which you can find it on server */
  filename: string;

  /** resource id */
  _id: string;
}

/**
 * single character
 * @example {"_id":"6181395d67568b70180ce93b","title":"Yuuta","description":"main character","imagesList":[],"__v":0,"createdAt":"2021-11-04T11:01:42.143+00:00","updatedAt":"2021-11-04T11:01:42.143+00:00"}
 */
export interface Character {
  /** mongodb id */
  _id: string;

  /** scenery title */
  title: string;

  /** scenery description */
  description: string;

  /** array of character images */
  imagesList: CharacterImage[];

  /** mongodb __v */
  __v: number;

  /** create timestamp */
  createdAt: string;

  /** update timestamp */
  updatedAt: string;
}

/**
 * returns list of characters (if no filters specified, returns first 5 characters)
 */
export interface CharactersResponse {
  /** list of characters */
  data: Character[];

  /** number of total characters */
  totalItems: number;
}

/**
 * response with character data in `data` key
 */
export interface SingleCharacterResponse {
  /** scenery */
  data: Character;
}
