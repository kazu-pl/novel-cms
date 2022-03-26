# How to install private GitHub/npm package via ssh

To install package via `ssh` you can follow th instructions listed [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys).

Those steps are:

##### Step 1: Check if your machine already has a public/private rsa key pair

First of all, check if you already ssh set up to access you private git repo. To do that, run:
`ssh git@github.com`

If you don’t receive any message like successful, continue to the next step:
Go to ssh key folder. It is under `C:\Users\Username\.ssh` on windows and `~/.ssh/` on Linux.

If you already have keys before, you could see files like `id_rsa` and `id_rsa.pub` (`id_ rsa` is name but it can be any other name) inside of the `.ssh` folder.

`id_rsa` is the default key pair of your computer. The `id_rsa` contains your private key and the `id_rsa.pub` contains your public key. If you already have them, open the content of `id_rsa.pub`, copy it and go to the github and paste it in the new ssh key as explained in the step 3. (you can skip step 2) If you don’t have `id_rsa`, go to step 2

##### Step 2: Generate rsa key pair public/private

Open the terminal and then paste the text below, substituting in your GitHub email address:

`ssh-keygen -t ed25519 -C "your_email@example.com"` (USE THIS ONE)

This creates a new ssh key, using the provided email as a label.

Generating public/private rsa key pair.
When you’re prompted to:

```
"Enter a file in which to save the key,"
```

you can either `press Enter` (This accepts the default file location) or type file name.

Next, at the prompt, type a secure passphrase. For more information, see “Working with SSH key passphrases”. You will be asked with this:

```
Enter passphrase (empty for no passphrase): [Type a passphrase]
```

You can just `press enter` without any passphrase.

The above will generate the default ssh key pair id_rsa that git.exe will automatically use to authenticate during ssh.

##### Step 3: Paste public key into github.com

Copy the SSH key to your clipboard. If your SSH key file has a different name than the example code, modify the filename to match your current setup. When copying your key, don’t add any newlines or whitespace.
To achieve it open terminal (like git bash for example) IN THE .ssh FOLDER AND TYPE:
`clip < ~/.ssh/id_rsa.pub`
OR
just copy THE WHOLE CONTENT OF THAT `id_rsa.pub` FILE.

Go to `GitHub/settings/SSH and GPG keys` and paste the public key. As title you can write something like `key of my personal PC` or whatever.

##### Step 4: test your SSH connection

Steps you need to follow in this step are listed [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)

Now you can test if you are connect to github using ssh with:

`ssh -T git@github.com`

When you type the above command you may see a warning like this:

```
> The authenticity of host 'github.com (IP ADDRESS)' can't be established.
> RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
> Are you sure you want to continue connecting (yes/no)?

```

You need to verify if that fingerprint `SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8` exists in GitHub public key fingerprints.
To do so visit this [link](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints) and check if that fingerprint is listed in public keys.

If it is, then come back to your terminal and type `yes` so it will add `github` to known hosts (it will add it do `known_hosts` file that is in `.ssh` folder)

When you typed `yes` you should see something like this:

```
Warning: Permanently added 'github.com,140.82.121.3' (ECDSA) to the list of known hosts.
Hi Your-GitHub-Username! You've successfully authenticated, but GitHub does not provide shell access.
```

check if the resulting message contains your github username. If you receive `permission denied` see this [link](https://docs.github.com/en/authentication/troubleshooting-ssh/error-permission-denied-publickey)

##### Step 5: install your private package

Now you can use the `git+ssh` link in your repo, add it to `package.json` and run `yarn` to install that package like so:

```json
{
  "new-package": "git+ssh://git@your_git_server.com:your_username/your_private_repo_name.git"
}
```

PAY ATTENPTION THAT YOU NEED TO MANUALLY ADD `git+ssh://` TO YOUR PACKAGE URL BECAUSE GitHub PROVIDES ONLY THE `git@your_git_server.com:your_username/your_private_repo_name.git` part

IF YOU GET ERROR LIKE:

```
$ yarn
yarn install v1.22.4
[1/4] Resolving packages...
Couldn't find any versions for "new-package" that matches "git@github.com:your-profile-name/your-private-repo.git"
? Please choose a version of "new-package" from this list: (Use arrow keys)
> 0.1.3
  0.1.2
  0.1.1
```

then it means that you forgot to add `git+ssh://` prefix and `yarn` found another package with the same name you provided in your `package.json` and wants to install it

# How to add `Accept-Language` header to axios headers to have API response in the right language:

You can make achieve it by adding that header to axios request interceptor and import your `i18n.ts` file and pick its `language` property:

```ts
// src/common/axios/axiosInstance.ts

import axios from "axios";
import { API_URL } from "common/constants/env";

import i18n from "../../i18n";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    "Accept-Language": i18n.language,
  };

  return config;
});

export default axiosInstance;
```

# `In browser redirect` warning/issue/message when creating index.html files with `yarn react-snap` AND HOW TO PRE-RENDER PROTECTED ROUTES:

"In browser redirect" means that somewhere you have redirect like this one:

```tsx
// more detailed info in: src/common/router/PrivateRoute.tsx

const PrivateRoute = (props) => {
  const tokens = getTokens();

  // below is the code that creates that "In browser redirect" issue
  if (!tokens) {
    const from = window.location.href.slice(window.location.origin.length);
    return <Navigate to={path(PATHS_CORE.LOGIN)} replace />;
  }

  return (
    <UserProfileWrapper>
      <Route {...props} />
    </UserProfileWrapper>
  );
};
```

That code will search for tokens in LocalStorage and if won't find them it will redirect to `/login`. It will be unable to find them because LocalStorage created in `react-snap` IS EMPTY OBJECT. It will be empty so you would need to manually put some tokens into that LocalStorage.
To not redirect do `/login` when `react-snap` is running, you can add additional condition:

```tsx
// navigator.userAgent !== "ReactSnap" is the additional condition. FOUND HERE: https://github.com/stereobooster/react-snap/issues/245#issuecomment-414347911

if (navigator.userAgent !== "ReactSnap" && !tokens) {
  const from = window.location.href.slice(window.location.origin.length);
  return <Navigate to={path(PATHS_CORE.LOGIN)} replace />;
}
```

Now user (react-snap in that case) won't be redirected in browser so react-snap can enter protected route. But PrivateRoute usually returns `UserProfileWrapper`and that component assumes that user is logged in and it performs api request for user data.
The reuqest will fail with 401 because react-snap is not really authenticated so yarn-snap will throw an error. So you also need to NOT return `UserProfileWrapper` like this:

```tsx
//  more detailed info in: src/common/router/PrivateRoute.tsx

const PrivateRoute = (props) => {
  const tokens = getTokens();

  if (navigator.userAgent !== "ReactSnap" && !tokens) {
    const from = window.location.href.slice(window.location.origin.length);
    return <Navigate to={path(PATHS_CORE.LOGIN)} replace />;
  }

  // if process is object (if react-snap is running) then return just Route WITHOUT UserProfileWrapper
  if (navigator.userAgent === "ReactSnap") {
    return <Route {...props} />;
  }

  return (
    <UserProfileWrapper>
      <Route {...props} />
    </UserProfileWrapper>
  );
};
```

### CANCEL REQUESTS TO PROTECTED ENDPOINTS THAT ARE FIRED ON MOUNT BY PROTECTED VIEWS

Some views that are protected (available only for logged in users) may fire api requests as soon as they are mounted like e.g. fetching some data for table or something. It will trigger error like this:

```
⚠️  warning at /character/list: got 401 HTTP code for https://novel-server.herokuapp.com/characters?sortBy=createdAt&sortDirection=asc&pageSize=5&currentPage=1
️�  console.log at /character/list: Failed to load resource: the server responded with a status of 401 (Unauthorized)

```

In that case `react-snap` won't create `index.html` pages or will create but only for certain languages. To handle this issue you need to EITHER:

- NOT perform any requests to protected api endpoints (It could be achieved by adding logic to `axios request interceptor` that does not perform any request if `navigator.userAgent === "ReactSnap`)
- write script to log user manually (HIGHLY NOT RECOMMENDED BEUCASE OF LACK IN SECURITY)
- disable auth in server just for the time of snaping front application (some requests may fail because sometimes API needs some data from tokens like userId)

So the best option is the first one (to not perform any request).

you can achieve it like below:

```tsx
// src/common/axios/axiosSecureInstance.ts

import axios from "axios";

const axiosSecureInstance = axios.create({
  baseURL: API_URL,
});

axiosSecureInstance.interceptors.request.use((config) => {
  const tokens = getTokens();

  if (navigator.userAgent === "ReactSnap") {
    // If you run react-snap then return object with empty options so axios WON'T EVEN PERFORM ANY REQUEST TO FETCH .e.g data for table with products. FOUND HERE: https://github.com/axios/axios/issues/1497#issuecomment-404211504

    return {
      headers: {},
      method: config.method,
      url: "",
    };
  }

  config.headers = {
    Authorization: `Bearer ${tokens && tokens.accessToken}`,
  };

  return config;
});
```

### NOT CREATE index.html FOR `/logout` PAGE OR ANY OTHER PAGE:

`react-snap` would create `index.html` for route `/logout` because there's some `Link` or `NavLink` from `react-router` that redirects to `/login`, so in order to NOT create `index.html` for `/login` (or any other route) you would need to either:
1 - not use `/logout` at all (and dispatch clearing store action in every place where there was redirect to /logout) `NOT RECOMMENDED`
2 - OR add some conditional redirect like this `RECOMMENDED`:

```tsx
if (navigator.userAgent !== "ReactSnap") {
  <Link to={path(PATHS.LOGOUT)} />;
}
```

OR if you pass array with data for dropdown or anything like that:

```tsx
// src/common/wrappers/DashboardLayoutWrapper.tsx

const DashboardLayoutWrapper = () => {
  const isReactSnapRunning = navigator.userAgent === "ReactSnap";

  return (
    <DashboardLayout
      appBarProps={{
        title: "Dropdown Menu",
        avatarLink: "some_url.com",
        userDropdown: isReactSnapRunning
          ? [
              {
                icon: <AccountIcon />,
                to: path(PATHS_CORE.ACCOUNT),
                label: t("dashboardPage.userDropdown.account"),
              },
              // if react snap is running then DO NOT PASS /logout route because it has redirect which would cause problems with react-snap
            ]
          : [
              {
                icon: <AccountIcon />,
                to: path(PATHS_CORE.ACCOUNT),
                label: t("dashboardPage.userDropdown.account"),
              },
              // here we are in real running browser and not in react-snap so we can safetly pass /logout route
              {
                icon: <LogoutIcon />,
                to: PATHS_CORE.LOGOUT,
                label: t("dashboardPage.userDropdown.logout"),
                isErrorColor: true,
              },
            ],
      }}
    />
  );
};
```

# `i18next::languageUtils: rejecting language code not found in supportedLngs: dev` warning in console

This error happens when you have don't pass any `fallbackLng` in `src/i18n.ts` and pass `supportedLngs` so i18n will by default add lang `dev` into `fallbackLng` which of course is not present in available langs in `supportedLngs` which causes the warning.

You can see that in console because i18n is configured to display that info in development:

```tsx
// src.i18n.ts

i18n.init({
  debug: process.env.NODE_ENV === "development",
});
```

So in order to disable that error you need to either:

- add `fallbackLng` as your lang for routes without lang prefix (for example: `fallbackLng: "pl"`)
- add `dev` lang to supported langs? and NOT USE IT AS REAL LANG IN URLS ?
- disable fetching `fallbackLng` at all by passing `false` PREFFERED !

You can also add `fallbackLng` as default lang `"pl"` BUT ONLY IN DEVELOPMENT MODE like debug options:

```tsx
// src.i18n.ts

import { fallbackLng } from "locales";

i18n.init({
  ...(process.env.NODE_ENV === "development" && { fallbackLng }),
});
```

OR (`THE BEST - 3rd OPTION`) simply disable loading fallbackLng at all by:

```tsx
// src.i18n.ts

import { fallbackLng } from "locales";

i18n.init({
  fallbackLng: false,
});
```

# `Failed to load resource: net::ERR_CONNECTION_REFUSED` Error while trying to generate static `index.html` files

It means that there was an error with network. Check the following steps to overcome that error:

- maybe you don't have network connection at the time of sending that request
- maybe you put wrong API url in `.env` file, e.g. you put adres of your local server but forgot to run it
- maybe the server itself has some problems

# `TypeError: Cannot read property 'map' of undefined` Error while trying to generate static `index.html` files

If you got error like this:

```
�  console.log at /en/character/list: TypeError: Cannot read property 'map' of undefined
�  console.log at /en/character/list: {
  error: {},
  errorInfo: {
    componentStack: '\n' +
      '    at jt (http://localhost:45678/static/js/2.9f0241fc.chunk.js:1:26099)\n' +
      '    at div\n' +

```

then it probably means that on route `/en/character/list` you try to render `Table` and as `data` prop you just pass the data const from redux store which works fine in browser but for some reason it throws that error when trying to use `react-snap`. This is just type / typeScript error. You can fix it with:

```tsx
import { selectCharacters } from "features/character/store/characterSlice";
import { Character } from "types/novel-server.types";

const SomeComponent = () => {
  const characters = useAppSelector(selectCharacters);

  return (
    <Table
      // data={characters.data} // this is also of type `Character[]` and by default its value is just [] and it works in browser but DOES NOT work in react-snap
      data={characters.data || ([] as Character[])} // this works both in browser and in react-snap
    />
  );
};
```

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

# Error: Command "yarn install" exited with 128 on Vercel

if you got error `Error: Command "yarn install" exited with 128` while building app on vercel it means your project uses private repo and you didn't add it via SSH to the project.
Maybe you use your own custom UI library and you changed it visibility to private? It so, then during build process on vercel you will get that error (if you just added it git link to `package.json` instead of adding it with SSH).

To correct this, just change that private repo visibility.

# Redirect users to `/dashbaord` when they are logged in but manually enter `/login` or `/` url and hit enter:

To redirect user from `/login` to another route and don't allow logged user to login again, you need to write function in `Login.tsx` that will handle that behaviour.

Previous I had:

```tsx
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

```tsx
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

```ts
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

```ts
return axiosSecureInstance(originalConfig);
```

CORRECTED:

```ts
return axiosSecureInstance({
  ...originalConfig,
  ...(originalConfig.data !== undefined && {
    data: JSON.parse(originalConfig.data),
  }),
  // originalConfig.data is stringified but you have to pass object type for axios to stringify it and send to server. If you pass jsut originalConfig without JSON.parse() then axios won't send any body (you will be able to see in browser in requests tab that it sends body, but on server you won't see any body).
  // PAY ATTENTION - pass that parsed data object ONLY if it exists becuase not every request contains body and in that base originalConfig.data would be undefined and if you parse undefined then there will be an error and it will be catched by below catch (error) {} block that does window.location.href
});
```

For more details, check: `src/common/axios/axiosSecureInstance.ts`

# How to use `Try/Catch` block in component where you dispatch redux-toolkit action and do something in catch if error occured:

normally, Redux Toolkit will always return resolved promise even i `catch` block of `createThunkAction`. That is because by default you're supposed to handle error in `catch` block of `createThunkAction` by add error message to store in slice rejected method. So in your component you can't go to `catch` block because Redux will always return resolved promise. To correct this and be able to enter `catch` block in your component you need to add middleware like so:

```ts
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

```tsx
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

```ts
export default function replaceAt(array: any[], index: number, value: any) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}
```

USAGE:

```ts
const newArrayWithReplacedItem = replaceAt(
  charactersOnScreenArray,
  indexOfCharacterToEdit,
  newCharacterValues
);
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

```tsx
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
  );
};
```

- `2` - create `form-data` and append onto it images that you will find in `ref.current`:

```tsx
const onSubmit = () => {
  const fileFromInputRef = inputFileRef.current.files[0];

  const formData = new FormData();
  formData.append("file", fileFromInputRef); // "file" name is the same name that you use in multer `.single("file")` or `.array('file')`
};
```

Or, if you want to send multiple files (and use .array('files') option to receive multiple files):

- `2-a` - turn files from ref into array and by using forEach, append it with the same name:

```tsx
const filesFromInputRef = Array.from(inputFilesRef.current.files);

const formData = new FormData();

filesFromInputRef.forEach((file) => {
  formData.append("files", file); // "files" is the name under which you send array of images so put 'files' in .array('files')
});
```

- `2-b` - add prop `encType="multipart/form-data"` to form that contains `<input type="file" />`:

```tsx
<Formik
  initialValues={initialMultipleFileValues}
  onSubmit={handleAsyncMultipleSubmit}
  validationSchema={validationMultipleFilesSchema}
>
  {({ isSubmitting, values }) => (
    <Form encType="multipart/form-data">
      {/* add encType="multipart/form-data" to correctly send muliple files */}
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

```ts
const response = await axiosSecureInstance.put(`/users/me/files`, formData);
```

# How to reset globally whole store on logout:

Redux-toolkit is some kind of a wrap over standard redux and it re-exports some of original redux functions.

you can create `rootReducer` which can get every action type and just return empty state if `logout` action occured. You can do it like so:

```ts
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
  if (action.type === logout.fulfilled.type) {
    // instead of logout.fulfilled.type you can pass stirng like "/logout/fulfilled"
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

```ts
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
>;
```

Solution was found [here](https://ittone.ma/ittone/reactjs-redux-toolkit-reset-all-states-on-logout-except-one/)

# How to keep users logged in when they close tab and then open again on /login route:

You have to create function that checks whether user is logged or not (whether you can find tokens in LocalStorage) and if user's token is still valid (not expired yet). You can do it like that:

```ts
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

```tsx
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

```tsx
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

```tsx
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

```tsx
export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
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

```tsx
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
