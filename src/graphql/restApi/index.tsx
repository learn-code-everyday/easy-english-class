import axios, { AxiosInstance } from "axios";

import {
  createHeader,
  createUrlParamFromObj,
  getContentType,
  getCustomUrl,
  getPath,
} from "@/helpers/restful";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});

// Define the payload types
interface Payload {
  path?: string;
  params?: Record<string, string | number>;
  url?: string;
  type?: string;
  headers?: Record<string, string>;
  body?: any;
}

class RestfulApi {
  public apiInstance: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.apiInstance = apiInstance;
  }

  public request = async (
    method: string = "GET",
    route: string = "",
    payload: Payload = {}
  ): Promise<any> => {
    const path = getPath(payload.path);
    const params = createUrlParamFromObj(payload.params);
    const customUrl = getCustomUrl(payload.url);
    const contentType = getContentType(payload.type);
    const baseHeaders = { "Content-Type": contentType };
    const headers = createHeader(payload.headers, baseHeaders);
    const url = customUrl.length > 0 ? customUrl : route + path + params;
    const data = payload.body ? payload.body : {};

    const requestObj = { url, headers, method, data };

    try {
      const response = await this.apiInstance.request(requestObj);

      return response;
    } catch (err: any) {
      if (err.response?.data) {
        throw err.response.data;
      } else if (err.response) {
        throw err.response;
      } else {
        throw err;
      }
    }
  };

  public get = (route: string) => (payload: Payload) =>
    this.request("GET", route, payload);

  public put = (route: string) => (payload: Payload) =>
    this.request("PUT", route, payload);

  public post = (route: string) => (payload: Payload) =>
    this.request("POST", route, payload);

  public delete = (route: string) => (payload: Payload) =>
    this.request("DELETE", route, payload);

  public patch = (route: string) => (payload: Payload) =>
    this.request("PATCH", route, payload);
}

const api = new RestfulApi(axiosInstance);

export default api;
