import { useRef, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import getSearchParamsFromUrl from "common/router/getSearchParamsFromUrl";
import { SortDirection } from "novel-ui/lib/Table";

export interface UsePaginationSearchParamsProps {
  sortBy: string;
  sortDirection: SortDirection;
  currentPage: number;
  pageSize: number;
  search: string;
}

export interface SetSearchParamsProps
  extends Partial<UsePaginationSearchParamsProps> {}

export interface UsePaginationSearchParamsOptions {
  /**
   * If this prop is set to `true`:
   *
   * on first enter at `/some-url` the hook will imiedietly redirect you to `/some-url?sortBy=....&sortDirection=...`.
   *
   * @default false
   */
  pushToInitialParamsOnFirstPageEnter?: boolean;
}

const usePaginationSearchParams = (
  {
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    search,
  }: UsePaginationSearchParamsProps,
  options?: UsePaginationSearchParamsOptions
) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstWebsiteEnter = useRef(true);

  const searchParams = useRef({
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    search,
  });

  const paramsFromUrlAsObject =
    getSearchParamsFromUrl<UsePaginationSearchParamsProps>(location.search, {
      number: ["currentPage", "pageSize"],
    });

  useLayoutEffect(() => {
    //  options?.pushToInitialParamsOnFirstPageEnter specifies whether the hook will imiedietly push queries in url on first route enter or not
    options?.pushToInitialParamsOnFirstPageEnter &&
      navigate({
        search:
          // push to params from url if they exists but only on first website enter (if someone wrote them by hand and hit enter)
          (isFirstWebsiteEnter && location.search) ||
          `sortBy=${sortBy}&sortDirection=${sortDirection}&currentPage=${currentPage}&pageSize=${pageSize}${
            search !== "" ? `&search=${search}` : ""
          }`,
      });

    isFirstWebsiteEnter.current = false;
  }, [
    navigate,
    location,
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    options?.pushToInitialParamsOnFirstPageEnter,
    search,
  ]);

  const setSearchParams = ({
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    search,
  }: SetSearchParamsProps) => {
    const {
      currentPage: prevCurrentPage,
      pageSize: prevPageSize,
      sortBy: prevSortBy,
      sortDirection: prevSortDirection,
      search: prevSearch,
    } = searchParams.current;

    const newCurrentPage = currentPage || prevCurrentPage;
    const newPageSize = pageSize || prevPageSize;
    const newSortBy = sortBy || prevSortBy;
    const newSortDirection = sortDirection || prevSortDirection;
    // below: I can't write `search || initialSearch` because when user removes input value then new value `search`  would be "" (empty string) so || operator would treat is as false and assign initialSearch while it should treat is as new value
    const newSearch = search !== undefined ? search : prevSearch;

    searchParams.current = {
      currentPage: newCurrentPage,
      pageSize: newPageSize,
      sortBy: newSortBy,
      sortDirection: newSortDirection,
      search: newSearch,
    };

    navigate({
      search: `sortBy=${newSortBy}&sortDirection=${newSortDirection}&currentPage=${newCurrentPage}&pageSize=${newPageSize}${
        newSearch !== "" ? `&search=${newSearch}` : ""
      }`,
    });
  };

  const isParamsFromUrlAsObjectEmpty =
    Object.keys(paramsFromUrlAsObject).length === 0 &&
    paramsFromUrlAsObject.constructor === Object;

  return [
    options?.pushToInitialParamsOnFirstPageEnter
      ? paramsFromUrlAsObject || searchParams.current
      : isParamsFromUrlAsObjectEmpty // 1 -  if someone put their own params in url and hit enter or the page was refreshed...
      ? searchParams.current // 3 - ,but if url does not have any params, return the original ones
      : paramsFromUrlAsObject, // 2 - ...return that params from url
    setSearchParams,
  ] as const;
};

export default usePaginationSearchParams;
