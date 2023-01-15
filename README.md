# `Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './lib/tokenize' is not defined by "exports"` error:

If you have updated node version or pushed new version of this repo to Vercel (and Vercel's node version got updated) you will probably get error like this:

```powershell
$ yarn build
yarn run v1.22.4
$ react-scripts build
node:internal/modules/cjs/loader:535
      throw e;
      ^

Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './lib/tokenize' is not defined by "exports" in D:\MY-VISUAL-NOVEL-P
ROJECT\novel-cms\node_modules\postcss-safe-parser\node_modules\postcss\package.json
    at new NodeError (node:internal/errors:393:5)
    at throwExportsNotFound (node:internal/modules/esm/resolve:358:9)
    at packageExportsResolve (node:internal/modules/esm/resolve:668:3)
    at resolveExports (node:internal/modules/cjs/loader:529:36)
    at Module._findPath (node:internal/modules/cjs/loader:569:31)
    at Module._resolveFilename (node:internal/modules/cjs/loader:981:27)
    at Module._load (node:internal/modules/cjs/loader:841:27)
    at Module.require (node:internal/modules/cjs/loader:1061:19)
    at require (node:internal/modules/cjs/helpers:103:18)
    at Object.<anonymous> (D:\MY-VISUAL-NOVEL-PROJECT\novel-cms\node_modules\postcss-safe-parser\lib\safe-parser.js:1:17) {

  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
}

Node.js v18.12.1
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

```

It happened to me because I was developing this project with node `14.18.2` but Vercel at some point updated node to `18.12.1` and when I updated node on my computer to `18.12.1` then `yarn build` was throwing the same error as Vercel so I could check what happened.

`SOLUTION:`

1 - I still had installed node modules
2 - I removed react-scripts
3 - I installed latest react scrips via `yarn add react-scripts@latest`

# how to cancel request with axios

`1` - using `source` from `CancelToken`:

```tsx
// src/core/views/Login/Login.tsx

import axios from "axios";

const { CancelToken } = axios;
// const loginSource = CancelToken.source(); // it can't be here because once the action got canceled, you won't be able to perform it again

const LoginView = () => {
  const { i18n } = useTranslation();

  const loginSource = useMemo(() => CancelToken.source(), []); // loginSource has to be inside of component to make sure it is created every time user enters the page, otherwise (when loginSource is moved above loginView) once the action was canceled, you won't be able to perform it again (clicking the login button will dispaly `login action cancelled` message). Additionally, I wrapped it in useMemo so the loginSource won't be changing every time any state changes - this is just small performance improvement.

  const handleSubmit = async (values) => {
    try {
      await dispatch(login({ values, cancelToken: loginSource.token }));
    } catch (err) {
      enqueueSnackbar(err as string, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    return () => {
      // cancel login request when user changes page
      loginSource.cancel(i18n.t("cancelNotifications.login")); // here i use i18n.t() instead of plain t() because t() will be updated/changed after language change so when you put it in this useEffect array dependency it will immediately run the useEffect return function which will cancel action. In another words: after language change when you click the login btn the login action will be canceled. To overcome this I use i18n.t() because it will always be the same object with the same reference so even if I put it into the array dependency it won't cancel anything
    };
  }, [loginSource, i18n]);

  return <button onClick={handleSubmit}>login</button>;
};
```

and the login action:

```ts
// src/core/store/uerSlice.ts

import { CancelToken } from "axios";

export const login = createAsyncThunk(
  "login",
  async (
    {
      values,
      cancelToken,
    }: { values: RequestLoginCredentials; cancelToken?: CancelToken },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<Tokens>("/cms/login", values, {
        cancelToken, // pass here cancelToken
      });
      saveTokens(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);
```

`2` - using `canceler` argument from `CancelToken`:

```tsx
// src/core/views/Login/Login.tsx

import axios, { Canceler } from "axios";

const { CancelToken } = axios;

const LoginView = () => {
  const loginCancelerRef = useRef<Canceler | null>(null);

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      let canceler: Canceler | null = null;

      const cancelToken = new CancelToken((c) => {
        canceler = c;
      });

      loginCancelerRef.current = canceler;

      await dispatch(login({ values, cancelToken }));
    } catch (err) {
      enqueueSnackbar(err as string, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    return () => {
      loginCancelerRef.current &&
        loginCancelerRef.current("login was cancelled");
    };
  }, []);

  return <button>login</button>;
};
```

The `login()` action from store is the same as in the `1` example.

`3` - using `AbortController` from `Web API`:

```tsx
const LoginView = () => {
  const controller = useMemo(() => new AbortController(), []);
  const signal = controller.signal;

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await dispatch(login({ values, abortSignal: signal }));
    } catch (err) {
      if (
        // @ts-ignore
        signal.aborted &&
        // @ts-ignore // for some reason here in CRA you won't be able to compile the project as it says that `reason` does not exist on `signal`
        signal.reason &&
        // @ts-ignore // but in Next it worked fine
        typeof signal.reason === "string"
      ) {
        // @ts-ignore
        enqueueSnackbar(signal.reason, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(err as string, {
          variant: "error",
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      // @ts-ignore
      controller.abort("login action was aborted");
    };
  }, [controller]);

  return <button>login</button>;
};
```

And the `login` action from store:

```ts
export const login = createAsyncThunk(
  "login",
  async (
    {
      values,
      abortSignal,
    }: { values: RequestLoginCredentials; abortSignal?: AbortSignal },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<Tokens>("/cms/login", values, {
        signal: abortSignal,
      });
      saveTokens(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);
```

Examples taken from [here](https://axios-http.com/docs/cancellation)

# how to auto open modal when CTRL + V was clicked and paste clipboard data into input

There are 2 ways to open modal after hitting CTRL + V:
1 - add eventListener that will listen to this specific key combination (PREFFERED)
2 - make invisivble input and use its paste event (it often losses focus so it's easy to broke it or stop working and user would need to refresh page to make it work again)

Both of below implementations overrides the initial form data so after initial paste action, closing modal and opening it again user will see the previously pasted content instead of the still current data fetched from API

### Open modal and paste clipboard data to using eventListener

```tsx
// full code: src/features/character/views/CharacterEdit/CharacterEdit.tsx

const CharacterEdit = () => {
  // initial values for form rendered inside of modal. It's needed to update the initial values after ctrl + v was clicked and user closed the modal. Right before closing  the modal you override the initialValues so the next time is open, you will see the previously pasted data even thou it was not updated yet
  const [initialValues, setInitialValues] = useState<RequestCharacter>({
    title: character.data?.title || "",
    description: character.data?.description || "",
  });

  // this is just to update the initial data after fetching data of concrete character from API
  useEffect(() => {
    setInitialValues((prev) => ({
      ...prev,
      title: character.data?.title || "",
      description: character.data?.description || "",
    }));
  }, [character.data]);

  // just fetching character data
  useEffect(() => {
    fetchCharacter();
  }, []);
  // -----------------------------------------------------------------------
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const descriptionTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOpenEditingModalOnCTRL_V = useCallback((e: KeyboardEvent) => {
    // detects when CTRL + V was clicked. It won't work on MAC because CTRL does not exist there (it has `command` btn instead)
    if (e.key === "v" && e.ctrlKey) {
      setIsUpdateModalOpen(true);
      setInitialValues((prev) => ({ ...prev, description: "" })); // reset the initial description (otherwise when you paste text it will be pasted BEFORE the previous text and the previous text will be still there but that's not what we want, we want to paste the copied text and nothing more, no previous text)
      descriptionTextAreaRef && descriptionTextAreaRef.current?.focus(); // focus textArea so the text will be pasted into the textArea
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleOpenEditingModalOnCTRL_V);

    return () => {
      window.removeEventListener("keydown", handleOpenEditingModalOnCTRL_V);
    };
  }, [handleOpenEditingModalOnCTRL_V]);

  return (
    <div>
      <Modal
        open={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          // below setInitialValues is needed to update description value after user presed ctrl + v and clicked outside the form to close the modal. onClose will save the pasted value as new initialValue so when user opens modal again via edit btn they will see the previously pasted value, not an empty string or the original data
          setInitialValues((prev) => ({
            ...prev,
            description:
              descriptionTextAreaRef.current?.textContent || prev.description, // set the current textContent from textArea as new initial value for description key so when you open the modal again via button it will show the previously pasted text, and not empty field (empty because you set to to empty string riht before you focus it just to be able to paste something there without seeing the previous content)
          }));
        }}
      >
        <BasicDataForm
          maxWidth="100%"
          onSubmitSideEffect={() => {
            setIsUpdateModalOpen(false); // just close the modal when update was successful
          }}
          onCancelBtnClick={(values) => {
            setInitialValues(values); // values are values obtained from Formnik via destructurizing them from children prop used as a function. It's:
            // <Formik>
            //   {({ isSubmitting, values }) => (
            //     <Button
            //       variant="text"
            //       color="error"
            //       onClick={(e) => {
            //         onCancelBtnClick(values);
            //       }}
            //     >
            //       {t("buttons.cancel")}
            //     </Button>
            //   )}
            // </Formik>;
            // you have to override initial values here so when the modal is open and you click `cancel` button and open  the modal again, it will have the previously pasted value, not the real one
            setIsUpdateModalOpen(false);
          }}
          descriptionTextAreaRef={descriptionTextAreaRef} // just regular ref passed down to the TextArea input
          initialValues={initialValues}
        />
      </Modal>
    </div>
  );
};
```

### Open modal and paste clipboard data via invisible div with contentEditable prop

```tsx
// full code: src/features/scenery/views/SceneryEdit/SceneryEdit.tsx

const SceneryEdit = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const descriptionTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const editableDivRef = useRef<HTMLDivElement | null>(null);

  // this is just to update the initial data after fetching data of concrete character from API
  useEffect(() => {
    setInitialValues((prev) => ({
      ...prev,
      title: singleScenery.data?.title || "",
      description: singleScenery.data?.description || "",
    }));
  }, [singleScenery.data]);

  const fetchScenery = useCallback(async () => {
    try {
      await dispatch(fetchSingleScenery());
      editableDivRef.current?.focus({ preventScroll: true }); // focus editableDiv after data was fetched to allow opening modal on paste event
    } catch (error) {}
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    fetchScenery();
  }, [fetchScenery]);

  useEffect(() => {
    // auto focuses the editableDiv so it is focuesed already when you enter the page and you can use paste event to open modal
    editableDivRef.current?.focus({ preventScroll: true });
    // this does not really work right now because editableDiv is inside of NotFoundWrapper which will render it after the data is fetched (that's why the edditableDivRef is also focused after the data was successfuly downwloaded in fetchCharacter function)
  }, [editableDivRef]);

  const handlePasteEditableDiv = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault(); // prevents pasting text into the div

    const pastedText = e.clipboardData.getData("text");

    if (typeof pastedText === "string") {
      setInitialValues((prev) => ({ ...prev, description: pastedText })); // saves new initial value with the pasted content as description
      setIsUpdateModalOpen(true);

      // // setTimeout with 0 timeout to make this async so it'll focus textArea AFTER the modal with textArea was mounted (it will be mounted once you call setIsUpdateModalOpen(true) function above)
      setTimeout(() => {
        descriptionTextAreaRef.current?.focus({ preventScroll: true });
      }, 0);
    }
  };

  const onEditableDivKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <DashboardLayoutWrapper>
      {/*  */}
      <div
        ref={editableDivRef}
        onPaste={handlePasteEditableDiv}
        contentEditable // this prop allows to paste some text into this div, it acts like an input tag
        onKeyPress={onEditableDivKeyPress}
        // for some reason this div needs border property (at least 1px). Otherwise it won't work on chrome
        style={{ width: 0, height: 0, border: "1px solid transparent" }}
      />
      {/*  */}
      <NovelUIModal
        headlineText={t("buttons.update")}
        open={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setInitialValues((prev) => ({
            ...prev,
            description:
              descriptionTextAreaRef.current?.textContent || // save current textContent of textArea input. TextArea was focued right after opening modal which means it has pasted data from clipboard so we can use it here and save as the new initial value so when user opens the modal again, they will see the previously pasted data
              prev.description,
          }));
          editableDivRef.current?.focus({ preventScroll: true }); // focus editableDiv so it can again open modal on paste event
        }}
        maxWidthOnDesktop={1000}
        widthOnDesktop="100%"
      >
        <BasicDataForm
          onSubmitSideEffect={() => {
            fetchScenery(); // fetch and focus item after updating item (updating logic is inside of BasicDataForm)
            setIsUpdateModalOpen(false);
            editableDivRef.current?.focus({ preventScroll: true }); // focus editableDiv so it can again open modal on paste event
          }}
          onCancelBtnClick={(values) => {
            setInitialValues(values); // values are `values` key (formik form values) destructured from children prop of Formik used as a function
            setIsUpdateModalOpen(false);
            editableDivRef.current?.focus({ preventScroll: true }); // focus editableDiv so it can again open modal on paste event
          }}
          descriptionTextAreaRef={descriptionTextAreaRef}
          initialValues={initialValues}
        />
      </NovelUIModal>
    </DashboardLayoutWrapper>
  );
};
```

# How to create Markdown component that will render markdown:

```tsx
// src/components/Markdown/Markdown.tsx

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

export interface MarkdownProps {
  children?: string;
}

const Markdown = ({ children }: MarkdownProps) => {
  if (!children) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              // @ts-ignore
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
```

# How to highliht searching part of a text with `react-highlight-words`:

```tsx
import Highlighter from "react-highlight-words";

const SomeComponent = () => {
  return (
    <Table
      columns={[
        {
          title: t("CharacterPages.list.table.columns.title"),
          key: "title",
          render: (row) => (
            <Highlighter
              searchWords={[searchParams.search]} // searchWords are words that should be highlighted, here I pass only search word
              textToHighlight={row.title} // textToHighlight is the whole text
            />
          ),
          isSortable: true,
        },
      ]}
    />
  );
};
```

# How to make `component` prop:

`Without styled-components:`

You can create `component` prop that will allow you to pass any kind of html tag passed as a string (or another component like `Link` from `react-router-dom`) by creating a prop typed as `ElementType`:

```tsx
import { ElementType } from "react";

export interface ButtonWithCompProps {
  children: React.ReactNode;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: ElementType;
}

const ButtonWithComponentProp = ({
  children,
  component = "button",
}: ButtonWithCompProps) => {
  const Component = component as ElementType<JSX.IntrinsicElements["button"]>; // without this Component's props won't be typed at all because plain ElementType is in real ElementType<any> so you wouldn't have any onClick prop or anything like that

  // now Component is fully typed as `button` html tag so you have types for `onClick` and other props
  return <Component>{children}</Component>;
};

export default ButtonWithComponentProp;
```

It will allow you to pass `button` or any other html tag. It will also allow you to pass other components like `Link`. If you pass `Link`, you would also need to pass prop `to` so you will have to add this prop `to` to `ButtonWithCompProps` interface or extend that interface with another interface.

taken from [Material UI Button props](https://mui.com/material-ui/api/button/#props)

`With styled-components:`

If you use `styled-components` library, you can use `as` prop of styled component to render different DOM element:

```tsx
import { ElementType } from "react";
import styled from "styled-components";

const StyledButton = styled.button``;

export interface ButtonWithCompProps {
  children: React.ReactNode;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: ElementType;
  to?: string;
}

const ButtonWithComponentProp = ({
  children,
  component = "button",
  ...rest
}: ButtonWithCompProps) => {
  return (
    // `as` prop comes form styled components library
    <StyledButton as={component} {...rest}>
      {children}
    </StyledButton>
  );
};

export default ButtonWithComponentProp;
```

More info [here](https://styled-components.com/docs/api#as-polymorphic-prop)

`Additional Info:` If you want to rename destructured prop and give it default value at the same time you can do it like this:

```tsx
import { ElementType } from "react";

export interface ButtonWithCompProps {
  component?: ElementType;
}

const ButtonWithComponentProp = ({
  component: Component = "button", // destructure prop, change its name and give it a default value. Note that it's not possible to additionaly cast a type by `as SomeType`. It doesn't work. The fact it's not possible found here: https://github.com/microsoft/TypeScript/issues/7576#issuecomment-198443953
}: ButtonWithCompProps) => {
  return <Component>{children}</Component>;
};

export default ButtonWithComponentProp;
```

# How to create RefreshAccessTokenWrapper that will refresh accessToken in the background

First, you will need to create a function, that will calculate how much time is left before accessToken will be expired. You can create something like this:

```tsx
// src/common/auth/tokens.ts

export const tokenExpiresInSeconds = (token?: string) => {
  if (!token) {
    return 0;
  }

  const decodedToken = jwtDecode<JwtPayload>(token);
  return decodedToken.exp ? decodedToken.exp - Date.now() / 1000 || 0 : 0;
};
```

Aditionally, you may (or may not but in general it's better to do it) need to make sure that store in redux resets right after logout action is dispatched, so change it:

```tsx
// src/common/store/rootreducer.ts
const rootReducer = (rootState: RootState | undefined, action: AnyAction) => {
  // change logout.fulfilled.type to logout.pending.type to make sure that store will reset itself right after dispatching action, not when server sends 200 after logut action. It's just to make sure that there won't be any delays between sending logout action, reseting store and removing tokens
  if (action.type === logout.pending.type) {
    if (rootState) {
      rootState = undefined;
    }
  }
  return combinedReducer(rootState, action);
};
```

then you will need to create functions that will set timeout index in localStorage which will allow you to refresh accessToken in only one tab in case there are more of them open in the browser. It will additionally allow you to remove timeout (that refreshes the accessToken) when you click logout button (you won't need to refresh accessToken anymore since you are logged out). To achive this, create functions like this:

```tsx
// src/common/wrappers/RefreshAccessTokenWrapper/refreshAccessTokenLSTokens.ts

export const REFRESHING_TOKEN_KEY = "novel-cms_refrehing-timeout";

export const setRefreshingTimeout = (timeout: number) => {
  localStorage.setItem(REFRESHING_TOKEN_KEY, `${timeout}`);
};

export const removeRefreshingTimeout = () => {
  localStorage.removeItem(REFRESHING_TOKEN_KEY);
};

export const getRefreshingTimeout = () => {
  const timeout = localStorage.getItem(REFRESHING_TOKEN_KEY);

  if (!timeout || typeof +timeout !== "number") {
    return null;
  }

  return +timeout;
};
```

On top of that, we will need to stop the timeout when user actually clicks the logout button, in order to do that, just clear the interval and remove it form localStorage in logout action like so:

```ts
// src/core/store/userSlice.ts

import {
  getRefreshingTimeout,
  removeRefreshingTimeout,
} from "common/wrappers/RefreshAccessTokenWrapper/refreshAccessTokenLSTokens";

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    const tokens = getTokens();

    try {
      getRefreshingTimeout() && window.clearTimeout(getRefreshingTimeout()!); // clear timeout if it exists in localStorage
      removeRefreshingTimeout(); // remove the timeout index from localStorage

      // ... rest of logout logic
      //  fetch() and send tokens to blacklist them
    } catch (error) {
      // handle error
    }
  }
);
```

We will also need react hook tha will clear setTimeout index every time user refreshes the page so when the page loads again it can once again start refreshing tokens (in the actuall RefreshAccessTokenWrapper there's a condition that will not allow to refresh token if timeout index is in localStorage - this is to prevent refreshing token in multiple tabs at the same time):

```tsx
// src/common/wrappers/RefreshAccessTokenWrapper/useRemoveRefreshingTokensKeyListener.tsx

import { useCallback, useEffect } from "react";
import {
  REFRESHING_TOKEN_KEY,
  removeRefreshingTimeout,
} from "./refreshAccessTokenLSTokens";

/**
 * 1 - Clears setTimeout in case when refreshing timeout key was deleted from LocalStorage. Useful when user has couple of tabs and they refresh one of them - it will reset timeouts from all other tabs so the refreshing one can become the one that refreshes token
 *
 * 2 - Clears LocalStorage key (the key is responsible for indicating whether any tab refreshes access token) on `unload` event - when closing tab.
 */
const useRemoveRefreshingTokensKeyListener = (
  timeoutIndex: React.MutableRefObject<number | null>
) => {
  const handleStorageChange = useCallback(
    (e: StorageEvent) => {
      if (e.key === REFRESHING_TOKEN_KEY && e.newValue === null) {
        timeoutIndex.current && window.clearInterval(timeoutIndex.current);
      }
    },
    [timeoutIndex]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  const handleRemoveIsRefreshingToken = useCallback(() => {
    removeRefreshingTimeout();
  }, []);

  useEffect(() => {
    window.addEventListener("unload", handleRemoveIsRefreshingToken);
  }, [handleRemoveIsRefreshingToken]);
};

export default useRemoveRefreshingTokensKeyListener;
```

And finally we can create our RefreshAccessTokenWrapper component:

```tsx
// src/common/wrappers/RefreshAccessTokenWrapper/RefreshAccessTokenWrapper.tsx

import { getTokens, tokenExpiresInSeconds } from "common/auth/tokens";
import { PATHS_CORE } from "common/constants/paths";
import { useAppSelector } from "common/store/hooks";
import { refreshAccessToken } from "core/store/userSlice";
import { urlLogoutReasonQuery } from "core/views/Login";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRefreshingTimeout,
  removeRefreshingTimeout,
  setRefreshingTimeout,
} from "./refreshAccessTokenLSTokens";
import useRemoveRefreshingTokensKeyListener from "./useRemoveRefreshingTokensKeyListener";

interface RefreshAccessTokenWrapperProps {
  children: React.ReactNode;
}

const RefreshAccessTokenWrapper = ({
  children,
}: RefreshAccessTokenWrapperProps) => {
  const navigate = useNavigate();

  const timeoutIndex = useRef<number | null>(null);
  const userData = useAppSelector((state) => state.user.userProfile);

  useEffect(() => {
    const tokens = getTokens();
    // if getRefreshingTimeout() is truthy it means there is already a refreshing timeout index in LS (which means there's a tab that refreshes access token) then stop here and do not set new setTimeout because we don't want multiple tabs to refresh tokens, only one
    if (getRefreshingTimeout()) return;

    // userData here is only to fire this whole useEffect again when user really was logged in, it's not needed for logic, it's only for refiring the logic inside of useEffect
    // tokens are important because you want to refresh accessToken only if it exists
    if (userData && tokens?.accessToken) {
      const handleRefreshAccessToken = async () => {
        try {
          const resWithTokens = await refreshAccessToken();

          const nextTimeout = setTimeout(
            handleRefreshAccessToken,
            tokenExpiresInSeconds(resWithTokens.accessToken) * 1000 * 0.75
          ) as unknown as number;

          setRefreshingTimeout(nextTimeout);
          timeoutIndex.current = nextTimeout;
        } catch (error) {
          timeoutIndex.current && window.clearTimeout(timeoutIndex.current);

          timeoutIndex.current = null;
          removeRefreshingTimeout();

          navigate(
            `${PATHS_CORE.LOGOUT}?${urlLogoutReasonQuery.key}=${urlLogoutReasonQuery.value}`
          );
        }
      };

      const timeout = setTimeout(
        handleRefreshAccessToken,
        tokenExpiresInSeconds(tokens.accessToken) * 1000 * 0.75
      ) as unknown as number;

      setRefreshingTimeout(timeout);
      timeoutIndex.current = timeout;
    }
  }, [timeoutIndex, userData, navigate]);

  useRemoveRefreshingTokensKeyListener(timeoutIndex);

  return <>{children}</>;
};

export default RefreshAccessTokenWrapper;
```

And last but not least, import that `RefreshAccessTokenWrapper` and wrap it around `Router` component with routing (it's important to use it INSIDE of BrowserRouter):

```tsx
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

import RefreshAccessTokenWrapper from "common/wrappers/RefreshAccessTokenWrapper";

function App() {
  return (
    <BrowserRouter>
      <RefreshAccessTokenWrapper>
        <Router />
      </RefreshAccessTokenWrapper>
    </BrowserRouter>
  );
}

export default App;
```

# How to create `remember me` checkbox (or actually radio button) and its behavior

`1` - Create checkbox that sets `rememberMe` boolean and when you submit login form you can add eventListener that will remove tokens from localStorage if `rememberMe` is false:

```tsx
import { handleRememberMe } from "features/core/store/userSlice.tsx"; // import action from userSlice that removes tokens from localStorage. It's important to make one action and use it here instead of passing anonymous arrow function to addEventListener (to make sure that the function you pass has the same reference in both addEventListener and removeEventListener)

interface LoginFormValues {
  login: string;
  password: string;
  rememberMe: boolean;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: true,
};

const Login = () => {
  const handleSubmit = (values: LoginFormValues) => {
    if (!values.rememberMe) {
      // if you login and rememberMe is false, then add listener that will remove tokens from LocalStorage when user closes the tab or the whole browser
      window.addEventListener("unload", handleRememberMe);
    }

    dispatch(login({ login, password }));
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Box pt={2} display="flex" justifyContent="flex-start">
        <CheckboxFormik
          name="rememberMe"
          id="rememberMe"
          label={t("form.rememberMe")}
        />
      </Box>
    </Formik>
  );
};
```

`2` The `handleRememberMe` function is simply and just removes tokens from localStorage:

```tsx
// src/features/core/store/userSlice.tsx

import { removeTokens } from "common/auth/tokens.tsx";

export const handleRememberMe = () => {
  const tokens = getTokens(); // assign tokens to const to still have access then the tokens are removed from localStorage
  axiosInstance.post("/cms/logout", tokens); // additionally, send the tokens to server to blacklist them
  removeTokens(); // this is the most important thing, to remove tokens from localstorage
};
```

`3` Additionally, you can remove the eventListener every time you logout because you no longer need to remove tokens, they are removed already because you logged out so in logout action:

```tsx
//src/core/store/usersSlice.tsx

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    const tokens = getTokens();
    try {
      removeRefreshingTimeout();
      removeTokens();

      window.removeEventListener("unload", handleRememberMe); // remove event listener as it is no longer needed becaucse you remove tokens anyway

      const response = await axiosInstance.post("/cms/logout", tokens);
      return response.data;
    } catch (error) {
      removeTokens();
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);
```

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

##### Step 4: test your SSH connection and add GitHub to known hosts

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

KEEP IN MIND THAT IF YOU DO IT, vercel WILL THROW 128 ERROR WHEN TRYING TO BUILD YOUR APP because it does not have any ssh key

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
  ...(originalConfig.data !== undefined &&
    !(originalConfig.data instanceof FormData) && {
      // if originalConfig.data is FormData (you send files) you can't pass it as a json file becuase it's not just regular object
      data: JSON.parse(originalConfig.data),
    }),
  // originalConfig.data is stringified but you have to pass object type for axios to stringify it and send to server. If you pass jsut originalConfig without JSON.parse() then axios won't send any body (you will be able to see in browser in requests tab that it sends body, but on server you won't see any body).
  // PAY ATTENTION - pass that parsed data object ONLY if it exists becuase not every request contains body and in that base originalConfig.data would be undefined and if you parse undefined then there will be an error and it will be catched by below catch (error) {} block that does window.location.href
});
```

BUT, if you want to return only:

```ts
return axiosSecureInstance(originalConfig);
```

instead of parsing body you can hardcode `Content-type` header:

```ts
axiosSecureInstance.interceptors.request.use((config) => {
  const tokens = getTokens();

  config.headers = {
    Authorization: `Bearer ${tokens && tokens.accessToken}`,
    "Content-Type": "application/json", // ALTERNATIVE: if you hardcode content-type you don't need to parse body after refreshing accessToken. You also won't need to checking if body is instance of FormData
  };

  return config;
});
```

Now you don't have to parse any `originalConfig.data` or checking if it's an instance of `FormData`

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
