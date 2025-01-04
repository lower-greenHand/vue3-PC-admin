import { isString, isObject, isArray } from '../is';
import { stringify } from 'json-fn';
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
      localStorage.setItem(key, stringify(value));
    } else {
      localStorage.setItem(key, stringify(value));
    }
  } else if (isArray(value)) {
    localStorage.setItem(key, stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

// Function serialization in objects
export const serializeFunctions = (obj) => {
  let serialized;
  if (isObject(obj)) {
    serialized = {};
    for (const key in obj) {
      if (isObject(obj[key])) {
        serialized[key] = serializeFunctions(obj[key]);
      } else if (isFunction(obj[key])) {
        serialized[key] = obj[key].toString();
      } else if (isArray(obj[key])) {
        serialized[key] = serializeFunctions(obj[key]);
      } else {
        serialized[key] = obj[key];
      }
    }
  } else if (isArray(obj)) {
    serialized = [];
    serialized = obj.map((item) => {
      if (isObject(item) || isArray(item)) {
        item = serializeFunctions(item);
      }
      return item;
    });
  }

  return serialized;
};

// Deserialization of functions in objects
export const deserializeFunctions = (obj) => {
  let deserialized;
  if (isObject(obj)) {
    deserialized = {};
    for (const key in obj) {
      if (isObject(obj[key])) {
        deserialized[key] = deserializeFunctions(obj[key]);
      } else if (isFunctionString(obj[key])) {
        // eslint-disable-next-line no-new-func, no-eval
        deserialized[key] = new Function(`return ${obj[key]}`)();
        // new Function(`return ${obj[key]}`)();
      } else if (isArray(obj[key])) {
        deserialized[key] = deserializeFunctions(obj[key]);
      } else {
        deserialized[key] = obj[key];
      }
    }
  } else if (isArray(obj)) {
    deserialized = [];
    deserialized = obj.map((item) => {
      if (isObject(item) || isArray(item)) {
        item = deserializeFunctions(item);
      }
      return item;
    });
  }
  return deserialized;
};
