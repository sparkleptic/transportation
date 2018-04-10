// @flow

const DEFAULT_KEY = 'id';

export default function convertArrayToMap(
  arrayJSON: Array<Object>,
  key: ?string = DEFAULT_KEY,
) {
  let map: Map<any, Object> = new Map();
  arrayJSON.forEach((data) => {
    map.set(data[key], data);
  });
  return map;
}
