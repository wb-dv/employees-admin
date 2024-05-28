import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const apiInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createApiInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((res) => res.data);
};

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;
