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
