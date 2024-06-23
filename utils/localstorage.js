export const get = (key) => window.localStorage.getItem(key);
export const save = (key, val) => window.localStorage.setItem(key, val);