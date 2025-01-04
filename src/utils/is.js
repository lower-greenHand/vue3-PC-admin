const toJudge = Object.prototype.toString;

// Judging as is
export const is = (val, type) => {
  return val && toJudge.call(val) === `[object ${type}]`;
};

// Judging as an object
export const isObject = (val) => {
  return is(val, 'Object');
};

// Judging as an array
export const isArray = (val) => {
  return is(val, 'Array');
};

// Judging as an string
export const isString = (val) => {
  return val && typeof val === 'string';
};

// Judging as an number
export const isNumber = (val) => {
  return val && typeof val === 'number';
};

// Judging as an function
export const isFunction = (val) => {
  return typeof val === 'function';
};

// Judging as an date
export const isDate = (val) => {
  return is(val, 'Date');
};

// Judging as an null
export const isNull = (val) => {
  return val === null;
};

// Judging as an boolean
export const isBoolean = () => {
  return is(val, 'Boolean');
};

// Judging as an isUrl
export const isUrl = (path) => {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  return reg.test(path);
};

// Judging as an window
export const isWindow = (val) => {
  return typeof val !== 'undefined' && is(val, 'Window');
};

// Judging as an function string
export const isFunctionString = (val) => {
  return (
    (typeof val === 'string' && val.includes('=>')) || val.includes('function')
  );
};
