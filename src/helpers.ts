export interface HttpRequest<T> {
  headers?: any;
  body?: T;
  params?: any;
}

export interface HttpResponse<T> {
  statusCode: number;
  data?: T;
}
