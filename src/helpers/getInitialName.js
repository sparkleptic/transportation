// @flow

export default function getInitialName(name: string) {
  return name.split(' ').reduce((initial, word) => {
    if (!word[0]) {
      return initial;
    }
    return initial.concat(word[0].toUpperCase());
  }, '');
}
