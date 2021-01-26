export const deepClone = obj => JSON.parse(JSON.stringify(obj));

export const getArrayLength = array => (array || []).length;

export const arrayAverage = array =>
  array.reduce((a, b) => a + b) / getArrayLength(array);

/**
 *
 * @param {*} objArray: array of objects
 * @param {*} fields: array of properties of object
 * @param {*} func: merge function
 * @return merged object for given properties
 *
 * ex:
 * const a = [{a: 1, b: 2, c: 3}, {a: 2, b: 3, c: 4}]
 * mergeArrayOfObjects(a, ['a', 'b'], arrayAverage)
 * Result should be: {a: 1.5, b: 2.5}
 */
export const mergeArrayOfObjects = (objArray, fields = [], func = null) => {
  const newObj = {};

  fields.forEach(field => {
    newObj[field] = func(objArray.map(item => item[field]) || []);
  });

  return newObj;
};
