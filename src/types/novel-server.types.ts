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
 * @example {"message":"request was sucessfully processed"}
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
 * type of single entity of scenery disctionary
 * @example {"title":"Mansion","id":"0000-0000-0000-0000"}
 */
export interface SingleSceneryFromDictionary {
  title: string;
  id: string;
}

/**
 * @example {"data":[]}
 */
export interface SceneriesDictionary {
  data: SingleSceneryFromDictionary[];
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
 * type of single entity of characters disctionary
 * @example {"title":"Yuuta","id":"0000-0000-0000-0000"}
 */
export interface SingleCharacterFromDictionary {
  title: string;
  id: string;
}

/**
 * @example {"data":[]}
 */
export interface CharactersDictionary {
  data: SingleCharacterFromDictionary[];
}

/**
 * response with character data in `data` key
 */
export interface SingleCharacterResponse {
  /** scenery */
  data: Character;
}

/**
 * signle character visible on screen options
 * @example {"characterId":"0000-0000-0000-0000","leftPosition":45,"name":"Aqua","zIndex":2,"imgUrl":"/files/character-sad.jpg"}
 */
export interface CharacterOnScreen {
  /** id of the character visible on screen */
  characterId: string;

  /** character name */
  name: string;

  /** X transition on the screen */
  leftPosition: number;

  /** z-index value */
  zIndex: number;

  /** link to character img */
  imgUrl: string;
}

export type CharacterOnScreenExtended = CharacterOnScreen & { _id: string };

/**
 * Single Dialog type
 * @example {"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus enim ac molestie pharetra. Aliquam pretium pharetra finibus. Etiam rutrum","characterSayingText":"Yuuta","charactersOnScreen":{"allOf":{"$ref":"#/components/schemas/CharacterOnScreen"}}}
 */
export interface Dialog {
  /** text that some charact is saying */
  text: string;

  /** character name that says the text */
  characterSayingText?: string;

  /** array of characters visible on screen */
  charactersOnScreen: CharacterOnScreen[];
}

/**
 * Single Dialog type with mongoDB _id field
 */
export type DialogExtended = Dialog & { _id: string; charactersOnScreen: CharacterOnScreenExtended[] };

/**
 * signle Scene type
 * @example {"title":"basic conversation between Yuuta and Shion","bgImg":{"link":"/files/mansion.jpg","sceneryId":"0000-0000-0000-0000"},"dialogs":{"allOf":{"$ref":"#/components/schemas/Dialog"}}}
 */
export interface Scene {
  /** scene title */
  title: string;

  /** scene background image */
  bgImg: { sceneryId: string; link: string };
  dialogs: Dialog[];
}

export type SceneExtended = Scene & {
  _id: string;
  bgImg: { sceneryId: string; link: string; _id: string };
  dialogs: DialogExtended[];
};

/**
 * Act type (used as newly adding Act item type and as a basic type extended by additional items from mongoDB in returning Act)
 * @example {"title":"Act I - The beginning","desciption":"This is the first Act. It introduces all main characters.","type":"start","nextAct":"Act II - The Dawn","scenes":[]}
 */
export interface Act {
  /** act title. Its unique title (no duplications allowed) */
  title: string;

  /** act description */
  description: string;

  /** act type */
  type: "start" | "normal" | "end";

  /** title of the next Act. If its end act, then nextAct is not needed. If its used to get first act to start game, pass 'start' */
  nextAct?: string;
  scenes: Scene[];
}

/**
 * Act type that extends basic Act type. It Adds fields from mongoDB
 * @example {"_id":"6181395d67568b70180ce93b","__v":0,"createdAt":"2021-11-04T11:01:42.143+00:00","updatedAt":"2021-11-04T11:01:42.143+00:00"}
 */
export type ActExtended = Act & {
  scenes: SceneExtended[];
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

/**
 * resonse with extended act in data member
 */
export interface ActExtendedResponse {
  /** extended act */
  data: ActExtended;
}

/**
 * @example {"_id":"6181395d67568b70180ce93b"}
 */
export type RequestUpdateAct = Act & { _id: string };

/**
 * response with all acts to dispaly them in a table
 * @example {"data":[],"totalItems":0}
 */
export interface ActsResponse {
  /** an array with all acts */
  data: ActExtended[];

  /** nmber of total acts */
  totalItems: number;
}

/**
 * contains id of act to delete
 * @example {"id":"0000-0000-0000-0001"}
 */
export interface RequestDeleteAct {
  /** act id */
  id: string;
}

/**
 * single act id and title
 * @example {"id":"0000-0000-0000-0000","title":"Act I - The beginning of the Dawn"}
 */
export interface SingleActDictionaryObject {
  /** act id */
  id: string;

  /** act title to display to user */
  title: string;
}

/**
 * list of objects with id and title of every act
 */
export interface ActDictionary {
  data: SingleActDictionaryObject[];
}
