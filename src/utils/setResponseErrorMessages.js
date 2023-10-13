export const setResponseErrorMessage = (errors) => {
  const errorsData = new Object();

  for (const key in errors) {
    errorsData[key] = errors[key].join();
  }

  return errorsData;
};
