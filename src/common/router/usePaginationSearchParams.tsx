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

const usePaginationSearchParams = <SortDirection,>({
  currentPage,
  pageSize,
  sortBy,
  sortDirection,
}: InitialPaginationSearchParamsProps<SortDirection>) => {
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
    // push to params from url if they exists but only on first website enter (if someone wrote them by hand and hit enter)
    history.push({
      search:
        (isFirstWebsiteEnter && history.location.search) ||
        `sortBy=${sortBy}&sortDirection=${sortDirection}&currentPage=${currentPage}&pageSize=${pageSize}`,
    });

    isFirstWebsiteEnter.current = false;
  }, [history, currentPage, pageSize, sortBy, sortDirection]);

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

  return [
    paramsFromUrlOnRefreshAsObject || searchParams.current, // if someone put their own params in url and hit enter or the page was refreshed, return them. If not, return the original ones
    setSearchParams,
  ] as const;
};

export default usePaginationSearchParams;
