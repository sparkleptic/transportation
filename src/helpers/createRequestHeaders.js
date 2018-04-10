// @flow

export default function createRequestHeaders(
  headerParams: Array<[string, string]>,
) {
  let map = new Map(headerParams);
  return {
    get: (key: string) => map.get(key),
  };
}
