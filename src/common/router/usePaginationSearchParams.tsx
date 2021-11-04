import { useRef, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";

export interface InitialPaginationSearchParamsProps<SortDirection> {
  sortBy: string;
  sortDirection: SortDirection;
  currentPage: number;
  pageSize: number;
}

export interface PaginationSearchParamsProps<SortDirection>
  extends Partial<InitialPaginationSearchParamsProps<SortDirection>> {}

export interface Options {
  /**
   * If this prop is set to `true`:
   *
   * on first enter at `/some-url` the hook will imiedietly redirect you to `/some-url?sortBy=....&sortDirection=...` and so on.
   *
   * You sould rather disable that option unless you really need to have query params on initial enter.
   *
   * if this prop is `false` or `undefined`:
   *
   * after entering at `/some-url` nothing happens (you will still get updated params from the hook).
   */
  pushToInitialParamsOnFirstPageEnter?: boolean;
}

const usePaginationSearchParams = <SortDirection,>(
  {
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
  }: InitialPaginationSearchParamsProps<SortDirection>,
  options?: Options
) => {
  const history = useHistory();
  const isFirstWebsiteEnter = useRef(true);

  const searchParams = useRef({
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
  });

  // below params are params when you refresh page or write your own search params and hit enter
  const paramsFromUrlOnRefresh = new URLSearchParams(history.location.search);
  const paramsFromUrlOnRefreshAsObject = Array.from(
    paramsFromUrlOnRefresh
  ).reduce((prev, current) => {
    return {
      ...prev,
      [current[0]]: current[1],
    };
  }, {} as InitialPaginationSearchParamsProps<SortDirection>);

  useLayoutEffect(() => {
    //  options?.pushToInitialParamsOnFirstPageEnter specifies whether the hook will imiedietly push queries in url on first route enter or not
    options?.pushToInitialParamsOnFirstPageEnter &&
      history.push({
        search:
          // push to params from url if they exists but only on first website enter (if someone wrote them by hand and hit enter)
          (isFirstWebsiteEnter && history.location.search) ||
          `sortBy=${sortBy}&sortDirection=${sortDirection}&currentPage=${currentPage}&pageSize=${pageSize}`,
      });

    isFirstWebsiteEnter.current = false;
  }, [
    history,
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    options?.pushToInitialParamsOnFirstPageEnter,
  ]);

  const setSearchParams = ({
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
  }: PaginationSearchParamsProps<SortDirection>) => {
    const {
      currentPage: initialCurrentPage,
      pageSize: initialPageSize,
      sortBy: initialSortBy,
      sortDirection: initialSortDirection,
    } = searchParams.current;

    const currentCurrentPage = currentPage || initialCurrentPage;
    const currentPageSize = pageSize || initialPageSize;
    const currentSortBy = sortBy || initialSortBy;
    const currentSortDirection = sortDirection || initialSortDirection;

    searchParams.current = {
      ...searchParams.current,
      ...(currentPage && { currentPage }),
      ...(pageSize && { pageSize }),
      ...(sortBy && { sortBy }),
      ...(sortDirection && { sortDirection }),
    };

    history.push({
      search: `sortBy=${currentSortBy}&sortDirection=${currentSortDirection}&currentPage=${currentCurrentPage}&pageSize=${currentPageSize}`,
    });
  };

  const isParamsFromUrlOnRefreshAsObjectEmpty =
    Object.keys(paramsFromUrlOnRefreshAsObject).length === 0 &&
    paramsFromUrlOnRefreshAsObject.constructor === Object;

  return [
    options?.pushToInitialParamsOnFirstPageEnter
      ? paramsFromUrlOnRefreshAsObject || searchParams.current
      : isParamsFromUrlOnRefreshAsObjectEmpty // 1 -  if someone put their own params in url and hit enter or the page was refreshed...
      ? searchParams.current // 3 - ,if not, return the original ones
      : paramsFromUrlOnRefreshAsObject, // 2 - ...return them
    setSearchParams,
  ] as const;
};

export default usePaginationSearchParams;
