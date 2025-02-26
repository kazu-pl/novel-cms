import { PATHS_CORE } from "common/constants/paths";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { LOCALSTORAGE_AUTH_TOKENS } from "common/constants/auth";
import { urlLogoutReasonQuery } from "core/views/Login";

const useTokenListener = () => {
  const navigate = useNavigate(); // instead of history = useHistory()

  const handleStorageChange = useCallback(
    (e: StorageEvent) => {
      if (e.key === LOCALSTORAGE_AUTH_TOKENS && e.newValue === null) {
        navigate(
          `${PATHS_CORE.LOGOUT}?${urlLogoutReasonQuery.key}=${urlLogoutReasonQuery.value}`
        );
      }
    },
    [navigate]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);
};

export default useTokenListener;
