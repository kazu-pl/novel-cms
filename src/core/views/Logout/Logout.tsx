import { Redirect } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";
import { useAppDispatch } from "common/store/hooks";
import { useLayoutEffect, useCallback } from "react";
import { logout } from "core/store/userSlice";

const Logout = () => {
  const dispatch = useAppDispatch();

  const logoutUser = useCallback(async () => {
    await dispatch(logout());
  }, [dispatch]);

  useLayoutEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Redirect to={PATHS_CORE.LOGIN} />;
};

export default Logout;
