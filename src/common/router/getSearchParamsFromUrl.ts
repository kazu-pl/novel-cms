/**
 * transforms search params from url into object. You can pass `T` type to type returned object with that `T` type.
 */
export const getSearchParamsFromUrl = <T>(search: string) => {
  const paramsFromUrlOnRefresh = new URLSearchParams(search);
  const paramsFromUrlOnRefreshAsObject = Array.from(
    paramsFromUrlOnRefresh
  ).reduce((prev, current) => {
    return {
      ...prev,
      [current[0]]: current[1],
    };
  }, {} as T);
  return paramsFromUrlOnRefreshAsObject;
};

export default getSearchParamsFromUrl;
