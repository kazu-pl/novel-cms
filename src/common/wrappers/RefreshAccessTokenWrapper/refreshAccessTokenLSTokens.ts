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
