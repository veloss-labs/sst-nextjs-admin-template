import ky from 'ky-universal';
import { apiHost } from '~/constants/env';

import type { Options } from 'ky';
import type { BaseResponse } from '~/api/ts/schema';
import type { ApiRoutes } from '~/ts/common';
import logger from '~/utils/logger';

export const apiClient = ky.create({
  prefixUrl: apiHost,
  hooks: {
    beforeError: [
      (error) => {
        const { response, request } = error;
        if (response) {
          logger.error(error.message, error, {
            method: request.method,
            url: response.url,
            status: response.status,
          });
        }

        return error;
      },
    ],
  },
});

export class ApiService {
  static readonly _API_ROUTES = {
    csrf: 'csrf',
    hello: 'hello',
  };

  static async get(pathname: ApiRoutes, options?: Options | undefined) {
    const response = await apiClient.get(pathname, options);
    return response;
  }

  static async post(pathname: ApiRoutes, options?: Options | undefined) {
    const response = await apiClient.post(pathname, options);
    return response;
  }

  static async delete(pathname: ApiRoutes, options?: Options | undefined) {
    const response = await apiClient.delete(pathname, options);
    return response;
  }

  static async put(pathname: ApiRoutes, options?: Options | undefined) {
    const response = await apiClient.put(pathname, options);
    return response;
  }

  static async patch(pathname: ApiRoutes, options?: Options | undefined) {
    const response = await apiClient.patch(pathname, options);
    return response;
  }

  static async getJson<R = Record<string, any>>(
    pathname: ApiRoutes,
    options?: Options | undefined,
  ) {
    const response = await this.get(pathname, options);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json<BaseResponse<R>>();
    return data;
  }

  static async postJson<R = Record<string, any>, Body = Record<string, any>>(
    pathname: ApiRoutes,
    body: Body,
    options?: Options | undefined,
  ) {
    const baseOptions = {
      ...(options || {}),
      json: body,
    } as Options;

    const response = await this.post(pathname, baseOptions);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json<BaseResponse<R>>();
    return data;
  }

  static async postFormData<R = Record<string, any>>(
    pathname: ApiRoutes,
    formData: FormData | HTMLFormElement,
    options?: Options | undefined,
  ) {
    const body =
      formData instanceof FormData ? formData : new FormData(formData);

    const baseOptions = {
      ...(options || {}),
      headers: {
        ...(options?.headers || {}),
        'Content-Type': 'multipart/form-data',
      },
      body,
    } as Options;

    const response = await this.post(pathname, baseOptions);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json<BaseResponse<R>>();
    return data;
  }

  static async postFormUrlEncoded<R = Record<string, any>>(
    pathname: ApiRoutes,
    body: Record<string, any>,
    options?: Options | undefined,
  ) {
    const baseOptions = {
      ...(options || {}),
      headers: {
        ...(options?.headers || {}),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body),
    } as Options;

    const response = await this.post(pathname, baseOptions);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json<BaseResponse<R>>();
    return data;
  }

  static async deleteJson<R = Record<string, any>>(
    pathname: ApiRoutes,
    options?: Options | undefined,
  ) {
    const response = await this.delete(pathname, options);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json<BaseResponse<R>>();
    return data;
  }

  static async deleteBody<R = Record<string, any>, Body = Record<string, any>>(
    pathname: ApiRoutes,
    body: Body,
    options?: Options | undefined,
  ) {
    const baseOptions = {
      ...(options || {}),
      json: body,
    } as Options;

    const response = await this.delete(pathname, baseOptions);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json<BaseResponse<R>>();
    return data;
  }

  static async putJson<R = Record<string, any>, Body = Record<string, any>>(
    pathname: ApiRoutes,
    body: Body,
    options?: Options | undefined,
  ) {
    const baseOptions = {
      ...(options || {}),
      json: body,
    } as Options;

    const response = await this.put(pathname, baseOptions);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json<BaseResponse<R>>();
    return data;
  }

  static async putFormData<R = Record<string, any>>(
    pathname: ApiRoutes,
    formData: FormData | HTMLFormElement,
    options?: Options | undefined,
  ) {
    const body =
      formData instanceof FormData ? formData : new FormData(formData);

    const baseOptions = {
      ...(options || {}),
      headers: {
        ...(options?.headers || {}),
        'Content-Type': 'multipart/form-data',
      },
      body,
    } as Options;

    const response = await this.put(pathname, baseOptions);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json<BaseResponse<R>>();
    return data;
  }

  static async putFormUrlEncoded<R = Record<string, any>>(
    pathname: ApiRoutes,
    body: Record<string, any>,
    options?: Options | undefined,
  ) {
    const baseOptions = {
      ...(options || {}),
      headers: {
        ...(options?.headers || {}),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body),
    } as Options;

    const response = await this.put(pathname, baseOptions);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json<BaseResponse<R>>();
    return data;
  }

  static async patchJson<R = Record<string, any>, Body = Record<string, any>>(
    pathname: ApiRoutes,
    body: Body,
    options?: Options | undefined,
  ) {
    const baseOptions = {
      ...(options || {}),
      json: body,
    } as Options;

    const response = await this.patch(pathname, baseOptions);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json<BaseResponse<R>>();
    return data;
  }
}
