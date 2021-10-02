import { HttpRequest, HttpResponse } from './Http';

export interface Controller {
  handle: (httprequest?: HttpRequest) => Promise<HttpResponse>;
}
