import { isString, isObject, isArray } from '../is';

// Get local cache
export const getLocCache = (key) => {
  const cacheValue = localStorage.getItem(key);
  if (!cacheValue) return null;
  if (isString(cacheValue)) {
    if (
      cacheValue.indexOf('{') === 0 &&
      cacheValue.lastIndexOf('}') === cacheValue.length - 1
    ) {
      const s_v = JSON.parse(cacheValue);
      if (isObject(s_v)) {
        const currentTime = new Date().getTime();
        if (s_v?.expiryTime && currentTime > s_v?.expiryTime) {
          localStorage.removeItem(key);
          return null;
        }
        return s_v.value;
      }
      return cacheValue;
    } else if (
      cacheValue.indexOf('[') === 0 &&
      cacheValue.lastIndexOf(']') === cacheValue.length - 1
    ) {
      return JSON.parse(cacheValue);
    }
    return cacheValue;
  }

  return cacheValue;
};

// set local cache + time(minute)
export const setLocCache = (key, value, time) => {
  if (!key) return;
  if (isObject(value)) {
    if (time) {
      const currentTime = new Date().getTime();
      const expiryTime = currentTime + time * 60 * 1000;
      value = {
        ...value,
        expiryTime,
      };
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } else if (isArray(value)) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};
