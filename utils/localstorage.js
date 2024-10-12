export const get = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {}
};
export const save = (key, val) => {
  try {
    return window.localStorage.setItem(key, val);
  } catch {}
};
