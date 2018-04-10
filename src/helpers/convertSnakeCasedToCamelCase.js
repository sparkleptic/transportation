// @flow

type RawObject = {[key: string]: any};

export default function convertSnakeCasedToCamelCase(
  snakeCased: RawObject,
): RawObject {
  let convertedObject = {};
  for (let key of Object.keys(snakeCased)) {
    let value = snakeCased[key];
    if (value != null) {
      if (Array.isArray(value)) {
        value = value.map((temp) => {
          if (temp != null && typeof temp === 'object') {
            return convertSnakeCasedToCamelCase(temp);
          }
          return temp;
        });
      } else if (typeof value === 'object') {
        value = convertSnakeCasedToCamelCase(value);
      }
    }
    let splitted = key.split('_');
    let firstWord = splitted[0];
    let capitalized = splitted
      .slice(1)
      .map((word) => {
        if (word.toLowerCase() === 'id') {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');

    convertedObject[firstWord + capitalized] = value;
  }
  return convertedObject;
}
