/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const implementsTKeys = <T>(data: any, requiredKeys: (keyof T)[]): data is T => {
  if (!data) {
    return false;
  }

  const implementKeys = requiredKeys.reduce((impl, key) => impl && key in data, true);

  return implementKeys;
};
