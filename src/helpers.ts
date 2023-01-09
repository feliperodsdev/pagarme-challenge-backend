export interface HttpRequest<T> {
  headers?: any;
  body?: T;
  params?: any;
}

export interface HttpResponse<T> {
  statusCode: number;
  data?: T;
}

export const ok = <T>(data: T) => {
  return {
    statusCode: 200,
    data: data,
  };
};

export const badRequest = <T>(data: T) => {
  return {
    statusCode: 400,
    data: data,
  };
};

export const created = <T>(data: T) => {
  return {
    statusCode: 201,
    data: data,
  };
};

export const serverError = () => {
  return {
    statusCode: 500,
    data: "Internal Server Error",
  };
};
