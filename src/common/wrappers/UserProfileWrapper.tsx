import { useEffect } from "react";
import { useAppDispatch } from "common/store/hooks";
import { fetchUserData } from "core/store/userSlice";

export interface UserProfileWrapperProps {
  children: React.ReactNode;
}

const UserProfileWrapper = ({ children }: UserProfileWrapperProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return <>{children}</>;
};

export default UserProfileWrapper;
