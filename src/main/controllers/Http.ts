/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpRequest = {
  query: Record<string, unknown>;
  params: Record<string, unknown>;
  body: any;
};

export type HttpResponse<T = any> = {
  statusCode: number;
  data: T;
};

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: error.message,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error.message,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data,
});
