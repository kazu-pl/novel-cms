import { ReactNode } from "react";

import CirtularProgress from "@mui/material/CircularProgress";
import Page404 from "core/views/NotFound";

export interface NotFoundWrapperProps {
  isLoadingData: boolean;
  isNotFound: boolean;
  children: ReactNode;
}

const NotFoundWrapper = ({
  children,
  isLoadingData,
  isNotFound,
}: NotFoundWrapperProps) => {
  return isLoadingData ? (
    <CirtularProgress />
  ) : isNotFound ? (
    <Page404 />
  ) : (
    <>{children}</>
  );
};

export default NotFoundWrapper;
