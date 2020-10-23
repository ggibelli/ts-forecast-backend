export const loggerInfo = (...params: unknown[]): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

export const loggerError = (...params: unknown[]): void => {
  console.log(...params);
};
