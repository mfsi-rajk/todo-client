export const clearEmptyValues = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === '' || obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      }
    }
  }
  return obj;
};
