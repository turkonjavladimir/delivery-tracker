/**
 * A convenience wrapper function to call fetch with get
 *
 * @param request
 * @returns
 */
export const httpGet = async <T>(
  request: RequestInfo,
  headers: HeadersInit = {}
): Promise<T> => {
  process.env.NODE_ENV === "development" &&
    console.log("TRPC: GET - ", request);

  return fetch(request, {
    headers,
  })
    .then((res) => res.json())
    .then((data) => data as T)
    .catch((err) => {
      console.error("🐞", request, err);
      throw err;
    });
};
