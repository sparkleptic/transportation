// @flow

export function persistData(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

export function getPersistedData(key: string) {
  return sessionStorage.getItem(key);
}

export function removePersistedData(key: string) {
  return sessionStorage.removeItem(key);
}

export function clearPersistedData() {
  return sessionStorage.clear();
}
