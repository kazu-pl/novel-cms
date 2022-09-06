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
