export interface GetSearchParamsFromUrlOptions {
  number?: string[];
  boolean?: string[];
  null?: string[];
  undefined?: string[];
}

/**
 * transforms search params from url into object. You can pass `T` type to type returned object with that `T` type but remember that all params returned by this function will be of type `string`.
 *
 * With 2nd argument `options` you can change the type of params that `getSearchParamsFromUrl` function will return. By default it parses all search params to `string` but you can change it and e.g. if param from url is `pageSize` you can pass `option` argument to say that you want to pare it to number, not string.
 *
 * @example
 * {
 * number: ['pageSize', 'currentPage'], // tell that you want `pageSize` from url to be number
 * // boolean // rest of the order
 * // null
 * // undefined
 * }
 *
 */
export const getSearchParamsFromUrl = <T>(
  search: string,
  options?: GetSearchParamsFromUrlOptions
) => {
  const paramsFromUrlOnRefresh = new URLSearchParams(search);

  const paramsFromUrlOnRefreshAsObject = Array.from(
    paramsFromUrlOnRefresh
  ).reduce((prev, current) => {
    return {
      ...prev,
      [current[0]]: current[1], // set everything to string by default
      ...(options &&
        options.number?.includes(current[0]) && {
          [current[0]]: +current[1], // convert to number
        }),
      ...(options &&
        options.boolean?.includes(current[0]) && {
          [current[0]]: current[1] === "true", // convert to boolean
        }),
      ...(options &&
        options.null?.includes(current[0]) && {
          [current[0]]: null, // convert to null
        }),
      ...(options &&
        options.undefined?.includes(current[0]) && {
          [current[0]]: undefined, // convert to undefined
        }),
    };
  }, {} as T);
  return paramsFromUrlOnRefreshAsObject;
};

export default getSearchParamsFromUrl;
