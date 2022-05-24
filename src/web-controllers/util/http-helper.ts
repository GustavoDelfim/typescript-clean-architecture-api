import { HttpResponse } from "../ports";

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (data: any): HttpResponse => ({
  statusCode: 500,
  body: data
})