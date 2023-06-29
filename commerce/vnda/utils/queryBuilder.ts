import { ProductSearchParams } from "../types.ts";

export const paramsToQueryString = (
  params: ProductSearchParams | { key: string; value: string }[],
) => {
  const keys = Object.keys(params) as Array<keyof typeof params>;

  const transformedParams: string[][] = [];

  keys.forEach((_key) => {
    const value = params[_key];
    const key = Array.isArray(value) ? `${_key}[]` : _key;

    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          transformedParams.push([key, v.toString()]);
        });
      } else {
        transformedParams.push([key, value.toString()]);
      }
    }
  });

  return new URLSearchParams(transformedParams);
};
