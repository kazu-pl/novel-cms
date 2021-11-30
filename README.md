# IMPORTANT: rename `"postbuild": "react-snap"` script to `"snap": "react-snap"`

If you have script `"postbuild": "react-snap"` in your package json, then it will automatically fire when `build` script is done. Its really useful for `postbuild` to auto run and generate static pages with usage of `react-snap` but it works only in your local environment. When I tried to push this app to `vercel` it created an error because there was no chrome in vercel. So i ranamed the script to `snap` so it won't auto fire on build and will allow to deploy to vercel.

BUT it means that if you want to generate static pages you have to do it manually by running `yarn snap` after `yarn build` or change `build` script from `react-scripts build` to something like `react-scripts build && yarn snap`

# How to redirect users after successful login to the page from which they were logged out due to expired session:

- `1` - in axios interceptor and in PrivateRoute when user sessio ended redirect user to `/logout` url but pass query param: `?from=/my/url/from/user/was/logged/out`

- `2` - in `/logout` redirect to `/login` but pass in state `from` member with the same value as you got in url query (you can also pass it in url and not in state - for `/login` page)

- `3` - then in `/login` component check `location.state` (or url query it `/logout` passed `from` in query) and if there is a `from` query (or however you want to name it) redirect to that `from` path instead of default path after login form was successfuly submited

For more, check:

- `src/common/axios/axiosSecureInstance.ts`
- `src/common/router/PrivateRoute.tsx`
- `src/core/views/Login/Logout.tsx`
- `src/core/views/Login/Login.tsx`

# Redirect users to `/dashbaord` when they are logged in but manually enter `/login` or `/` url and hit enter:

To redirect user from `/login` to another route and don't allow logged user to login again, you need to write function in `Login.tsx` that will handle that behaviour.

Previous I had:

```
// src/core/views/Login/Login.tsx

useLayoutEffect(() => {
const tokens = getTokens();
if (
  tokens &&
  !isTokenExpired(tokens.accessToken) &&
  !isTokenExpired(tokens.refreshToken)
)
  navigate(path(PATHS_DASHBOARD.DASHBOARD));
});


```

But it somehow didn't work and user was able to still enter login page (Maybe because it's not react-router-dom v6? ).

To correct that, replace above code with the following one:

```
// src/core/views/Login/Login.tsx


const tokens = getTokens();
if (
    tokens &&
  !isTokenExpired(tokens.accessToken) &&
  !isTokenExpired(tokens.refreshToken)
) {
    return <Navigate to={path(PATHS_DASHBOARD.DASHBOARD)} replace />;
}

```

It will work now and if someone log in, then change url manually to `/login` (`/` in my project) and hit enter OR open second tab on `/login` (`/` in my project) they will be redirected to `/dashbaord` route.

# Axios interceptor that returns error sent by server so it's possible to display server response message on front application:

```
import axios from "axios";
import { API_URL } from "common/constants/env";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    // error here is of type AxiosError

    if (error.response) {
      if (error.response.data) {
        return Promise.reject(error.response.data); // returns data object which is the data send my server so i can dispaly msg that server send to front
      } else {
        return Promise.reject(
          `An error occurred but server didn't send any error data`
        );
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


```

# Axios after refreshing AccessToken does not send body:

In AxiosSecureInstance you have to pass `originalConfig` but also `JSON.parse()` data from that `originalConfig` which is `originalConfig.data`. If you just pass `originalConfig` then axios won't send it correctly. You will be able to see in browser in requests tab that it sends body data but on server you won't see anything.

BAD:

```
  return axiosSecureInstance(originalConfig);
```

CORRECTED:

```
  return axiosSecureInstance({
  ...originalConfig,
  data: JSON.parse(originalConfig.data), // originalConfig.data is string but you have to pass object type for axios to stringify it and send to server. If you jsut originalConfig without JSON.parse() then axios won't send any body (you will be able to see in browser in requests tab that it sends body, but on serverwon't see any body)
});
```

For more details, check: `src/common/axios/axiosSecureInstance.ts`

# How to use `Try/Catch` block in component where you dispatch redux-toolkit action and do something in catch if error occured:

normally, Redux Toolkit will always return resolved promise even i `catch` block of `createThunkAction`. That is because by default you're supposed to handle error in `catch` block of `createThunkAction` by add error message to store in slice rejected method. So in your component you can't go to `catch` block because Redux will always return resolved promise. To correct this and be able to enter `catch` block in your component you need to add middleware like so:

```

// store.ts

import { Middleware } from "@reduxjs/toolkit";

export const throwMiddleware: Middleware = () => (next) => (action) => {
next(action);
if (action?.error) {
throw action.payload; // originally here was `throw action.error` but I consoled it and payload contains message returned from rejectedWithValue
}
};

export const store = configureStore({
reducer: {
counter: counterReducer,
user: userSlice,
},
middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(throwMiddleware),
});

```

Now, in every async thunk action you can return original error like this:

```

export const login = createAsyncThunk(
"login",
async (values: RequestLoginCredentials, { rejectWithValue }) => {
try {
const response = await axiosInstance.post("/login", values);
return response.data;
} catch (error) {
// const { message } = error as { message: string }; // error would be AxiosResponse or AxiosError here, but thanks to axios interceptor that returns error.response.data (check `Axios interceptor that returns error send by server` header) error here is object send by server so I can pick any field from it and return (assuming that server send an object with `message` key)

      // return rejectWithValue(error.response.data); // <--- without axios interceptor returning error.response.data
      // return rejectWithValue(message); // <---  with axios interceptor
      return rejectWithValue((error as FailedReqMsg).message); // <---  with axios interceptor with better version without making message const
    }

}
);

```

This was found [here](https://github.com/reduxjs/redux-toolkit/issues/910#issuecomment-801211740)

# How to replace item in array and return new array with replaced element at the same time

```
export default function replaceAt(array: any[], index: number, value: any) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}


```

USAGE:

```
const newArrayWithReplacedItem = replaceAt(
  charactersOnScreenArray,
  indexOfCharacterToEdit,
  newCharacterValues
)

```

this method replaces an item in array and returns new array (with repalced item) at the same time. Solution found [here](https://www.peterbe.com/plog/replace-an-item-in-an-array-without-mutation-in-javascript)

Just search for: `There's a much faster way and that's to use slice and it actually looks nicer too:`

# How to create input type file with formik or other form library:

Basucally, `<input type="file" />` is uncontrolled component and you can't set its value. To get value from uncontrolled component you can create ref and pass it to that `<input />` so you can read that ref value.
What you have to do is create an object or array ob objects in formik that will contain selected files, pass that value to component that returns `<input />` and loop over the array to show selected items.
On every `onChange` of input, you receive selected items, update formik state, pass that state to the component and in that component show items for every item from array.
When you submit, you will get that array from formik but you don't need that. In submit function you will check the `inputRef` files, create `formData` and append to it all files you can find in the input ref.

HOW TO CUSTOMIZE INPUT FILE:
You can hide original input file but you should add `id` to it, so you can use `label` for the same id and wrap it around your custom styled button or div. IMPORTANT: you can't use `<button/>` component inside `label` because when you will click on that, you will trigger that button click action, not the input triger action. The easiest way is to just use `span` that looks like a button:

- `1` - create `ref` and `<input type="file" />` tag and pass that ref to the input:

```

const Component = () => {

const inputFileRef = useRef<HTMLInputElement | null>(null);

return (
<>
<input id={id} type="file" hidden ref={inputRef} {...rest} />
<label htmlFor={id}>
<Button component="span" {...buttonProps}>
{text}
</Button>
</label>
</>
)
}

```

- `2` - create `form-data` and append onto it images that you will find in `ref.current`:

```

const onSubmit = () => {

const fileFromInputRef = inputFileRef.current.files[0];

const formData = new FormData();
formData.append("file", fileFromInputRef); // "file" name is the same name that you use in multer `.single("file")` or `.array('file')`

}

```

Or, if you want to send multiple files (and use .array('files') option to receive multiple files):

- `2-a` - turn files from ref into array and by using forEach, append it with the same name:

```

const filesFromInputRef = Array.from(inputFilesRef.current.files);

const formData = new FormData();

filesFromInputRef.forEach((file) => {
formData.append("files", file); // "files" is the name under which you send array of images so put 'files' in .array('files')
});

```

- `2-b` - add prop `encType="multipart/form-data"` to form that contains `<input type="file" />`:

```

<Formik
initialValues={initialMultipleFileValues}
onSubmit={handleAsyncMultipleSubmit}
validationSchema={validationMultipleFilesSchema}

> {({ isSubmitting, values }) => (

    <Form encType="multipart/form-data"> // add encType="multipart/form-data" to correctly send muliple files
      <FileInputFormik // formik component that renders invisible <input /> and label with button/span
        name="files"
        id="contained-button-file"
        accept="images"
        inputRef={inputFilesRef}
        multiple
        text="select files"
      />
    </Form>

)}
</Formik>

```

`3` - send that data via axios:

```

const response = await axiosSecureInstance.put(`/users/me/files`, formData);

```

# How to reset globally whole store on logout:

Redux-toolkit is some kind of a wrap over standard redux and it re-exports some of original redux functions.

you can create `rootReducer` which can get every action type and just return empty state if `logout` action occured. You can do it like so:

```

// store.ts

import { logout } from "core/store/userSlice"; // this is logout redux action

// first, create app reducer
const combinedReducer = combineReducers({
counter: counterReducer,
user: userSlice,
});

// below type is RootState equivalent (type of whole store state)
export type AppReducerType = ReturnType<typeof combinedReducer>;

const rootReducer = (
rootState: AppReducerType | undefined,
action: AnyAction
) => {
if (action.type === logout.fulfilled.type) { // instead of logout.fulfilled.type you can pass stirng like "/logout/fulfilled"
if (rootState) {
rootState = undefined; // reset whole store

     // rootState = {
     //   auth: undefined,
     //   books: rootState.books, // in case you would like to keep some data
     // }
    }

}
return combinedReducer(rootState, action);
};

// then, just use your rootReducer instead of manually assign every reducer
export const store = configureStore({
reducer: rootReducer,
middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(throwMiddleware),
});

```

Not it will reset whole store every time `logout` action occurs. But it turns out that types `AppReducerType` and type `RootState` created automatically by redux-toolkit tempalte are the same thing. You can rename `AppReducerType` to `RootState` and delete the original `RootState` like so:

```

// store.ts

// export type AppReducerType = ReturnType<typeof combinedReducer>; // CHANGE NAME TO `RootState`
export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer = (
rootState: RootState | undefined, // notice that rootState arg type changed from AppReducerType to RootState
action: AnyAction
) => {
if (action.type === logout.fulfilled.type) {
if (rootState) {
rootState = undefined;
}
}
return combinedReducer(rootState, action);
};

export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>; // REMOVE THAT
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>

> ;

```

Solution was found [here](https://ittone.ma/ittone/reactjs-redux-toolkit-reset-all-states-on-logout-except-one/)

# How to keep users logged in when they close tab and then open again on /login route:

You have to create function that checks whether user is logged or not (whether you can find tokens in LocalStorage) and if user's token is still valid (not expired yet). You can do it like that:

```

// tokens.ts

export const getTokens = (): Tokens | null => {
const tokens = localStorage.getItem(LOCALSTORAGE_AUTH_TOKENS);

if (!tokens) return null;

return JSON.parse(tokens);
};

export const isAccessTokenExpired = (accessToken: string) => {
const decodedAccessToken = jwtDecode<JwtPayload>(accessToken);

return decodedAccessToken.exp
? decodedAccessToken.exp < Date.now() / 1000
: true;
};

```

Then, in Login view component you can check before mount html markup whether access token exists and is valid:

```

// LoginView.tsx

import { getTokens, isAccessTokenExpired } from "common/auth/tokens";

useLayoutEffect(() => {
const tokens = getTokens();
if (tokens && !isAccessTokenExpired(tokens.accessToken))
history.push(PATHS_DASHBOARD.DASHBOARD);
});

```

# How to logout user from all tabs once logout occured:

- `1` - create listener that listends to LocalStorage and pushes to `.logout` route if tokens were removed:

```

import { PATHS_CORE } from "common/constants/paths";
import { useHistory } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { LOCALSTORAGE_AUTH_TOKENS } from "common/constants/auth";

const useTokenListener = () => {
const history = useHistory();

const handleStorageChange = useCallback(
(e: StorageEvent) => {
if (e.key === LOCALSTORAGE_AUTH_TOKENS && e.newValue === null) {
history.push(PATHS_CORE.LOGOUT);
}
},
[history]
);

useEffect(() => {
window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };

}, [handleStorageChange]);
};

export default useTokenListener;

```

- `2` - import that listener in `Router.tsx`:

```

// Router.tsx

import useTokenListener from "common/auth/useTokenListener";

const Router = () => {
useTokenListener();
return (
<Switch>
<Route path={PATHS_CORE.LOGIN} exact component={Login} />
<Route path={PATHS_CORE.LOGOUT} exact component={Logout} />
<PrivateRoute
        path={PATHS_DASHBOARD.DASHBOARD}
        exact
        component={Dashboard}
      />
<Route component={NotFound} />
</Switch>
);
};

export default Router;

```

- `3` - you can send your tokens to server to blacklist them which won't allow to get protected data if user logged out but tokens have not expired yet:

```

export const logout = createAsyncThunk(
"logout",
async (\_, { rejectWithValue }) => {
const tokens = getTokens();
try {
removeTokens();
const response = await axiosInstance.post("/cms/logout", tokens);
return response.data;
} catch (error: any) {
removeTokens();
return rejectWithValue(error.response.data);
}
}
);

```

- `4` - if on logout you send your tokens to server to blacklist them, then make sure you won't send that kind of request if tokens are already removed (they will be removed if you logout on another tab):

```

import { Redirect } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";
import { useAppDispatch } from "common/store/hooks";
import { useLayoutEffect, useCallback } from "react";
import { logout } from "core/store/userSlice";
import { getTokens } from "common/auth/tokens";

const Logout = () => {
const dispatch = useAppDispatch();

const logoutUser = useCallback(async () => {
getTokens() && (await dispatch(logout())); // if tokens have been removed already then do not send them to blacklist them
}, [dispatch]);

useLayoutEffect(() => {
logoutUser();
}, [logoutUser]);

return <Redirect to={PATHS_CORE.LOGIN} />;
};

export default Logout;

```

---

---

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

```

```
